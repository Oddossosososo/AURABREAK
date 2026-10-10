/* AURA Script — safe data parser and RNG runtime for AURABREAK.
   Parses .aura, .auracutsense, and .auraroll source without evaluating JavaScript. */
(() => {
  "use strict";
  const auraRegistry = new Map();
  const cutsceneRegistry = new Map();
  const poolRegistry = new Map();

  function unquote(value) {
    const s = value.trim();
    if (s.startsWith('"') && s.endsWith('"')) {
      try { return JSON.parse(s); } catch { throw new Error("Invalid quoted string: " + s); }
    }
    if (s === "true") return true;
    if (s === "false") return false;
    if (/^-?\d+(?:\.\d+)?$/.test(s) || /^-?\d+(?:\.\d+)?e[+-]?\d+$/i.test(s)) {
      const n = Number(s);
      if (!Number.isFinite(n)) throw new Error("Number is outside the supported range: " + s);
      return n;
    }
    return s;
  }

  function removeComments(source) {
    return source
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .split(/\r?\n/)
      .map(line => line.replace(/\/\/.*$/, ""))
      .join("\n");
  }

  function readHeader(source, expectedType) {
    if (typeof source !== "string") throw new TypeError("AURA source must be text.");
    const clean = removeComments(source);
    const head = clean.match(/^\s*(aura|cutscene|roll)\s+"([^"]+)"\s*\{([\s\S]*)\}\s*$/i);
    if (!head) throw new Error('Expected: ' + expectedType + ' "NAME" { ... }');
    const type = head[1].toLowerCase();
    if (type !== expectedType) throw new Error("This file needs a " + expectedType + " block.");
    return { name: head[2].trim(), body: head[3] };
  }

  function readFields(body, type) {
    const result = { type, effects: [] };
    for (const [index, raw] of body.split(/\r?\n/).entries()) {
      const line = raw.trim();
      if (!line || line === "}") continue;
      const match = line.match(/^([a-zA-Z][\w-]*)\s*:\s*(.*?)\s*;?$/);
      if (!match) throw new Error("Line " + (index + 2) + ": expected key: value");
      const key = match[1].toLowerCase();
      const value = unquote(match[2].replace(/;$/, "").trim());
      if (key === "effect") result.effects.push(String(value));
      else if (key === "reveal") result.reveal = String(value);
      else if (key === "aura" && type === "roll") {
        if (!Array.isArray(result.auras)) result.auras = [];
        result.auras.push(String(value));
      } else result[key] = value;
    }
    return result;
  }

  function parseAura(source) {
    const head = readHeader(source, "aura");
    const result = readFields(head.body, "aura");
    result.name = head.name;
    if (!Number.isFinite(Number(result.odds)) || Number(result.odds) < 1) {
      throw new Error("Aura odds must be at least 1.");
    }
    if (result.color && !/^#[\da-f]{3}(?:[\da-f]{3})?$/i.test(result.color)) {
      throw new Error("Color must be a hex value such as #b8a9ff.");
    }
    result.odds = String(result.odds);
    const stored = Object.freeze({ ...result, effects: Object.freeze([...result.effects]) });
    auraRegistry.set(head.name.toUpperCase(), stored);
    return stored;
  }

  function parseCutscene(source) {
    const head = readHeader(source, "cutscene");
    const result = readFields(head.body, "cutscene");
    result.name = head.name;
    if (!Number.isFinite(Number(result.duration)) || Number(result.duration) < 0) {
      throw new Error("Cutscene duration must be 0 or more milliseconds.");
    }
    result.duration = Number(result.duration);
    const stored = Object.freeze({ ...result, effects: Object.freeze([...result.effects]) });
    cutsceneRegistry.set(head.name.toUpperCase(), stored);
    return stored;
  }

  function parseRoll(source) {
    const head = readHeader(source, "roll");
    const result = readFields(head.body, "roll");
    result.name = head.name;
    result.base_luck = result.base_luck === undefined ? 1 : Number(result.base_luck);
    if (!Number.isFinite(result.base_luck) || result.base_luck < 0) {
      throw new Error("base_luck must be a finite number greater than or equal to 0.");
    }
    result.auras = Object.freeze([...(result.auras || [])]);
    const stored = Object.freeze(result);
    poolRegistry.set(head.name.toUpperCase(), stored);
    return stored;
  }

  function roll(poolName, luckMod = 1) {
    const pool = poolRegistry.get(String(poolName).toUpperCase());
    if (!pool) throw new Error('Unknown roll pool "' + poolName + '". Register it with AURA.registerRoll().');
    const extraLuck = Number(luckMod);
    if (!Number.isFinite(extraLuck) || extraLuck < 0) {
      throw new Error("luckMod must be a finite number greater than or equal to 0.");
    }
    const names = pool.auras.length ? pool.auras : [...auraRegistry.keys()];
    const candidates = names.map(name => {
      const aura = auraRegistry.get(String(name).toUpperCase());
      if (!aura) throw new Error('Aura "' + name + '" in pool "' + pool.name + '" has not been registered.');
      return aura;
    }).sort((a, b) => Number(b.odds) - Number(a.odds));

    const luck = pool.base_luck * extraLuck;
    if (luck <= 0) return null;
    for (const aura of candidates) {
      const chance = Math.min(1, luck / Number(aura.odds));
      if (Math.random() < chance) return aura;
    }
    return null;
  }

  window.AURA = Object.freeze({
    version: "0.2.0",
    parseAura,
    parseCutscene,
    parseRoll,
    getAura(name) { return auraRegistry.get(String(name).toUpperCase()) || null; },
    getCutscene(name) { return cutsceneRegistry.get(String(name).toUpperCase()) || null; },
    getRoll(name) { return poolRegistry.get(String(name).toUpperCase()) || null; },
    listAuras() { return [...auraRegistry.values()]; },
    listCutscenes() { return [...cutsceneRegistry.values()]; },
    listRolls() { return [...poolRegistry.values()]; },
    registerAura(source) { return parseAura(source); },
    registerCutscene(source) { return parseCutscene(source); },
    registerRoll(source) { return parseRoll(source); },
    roll
  });
})();