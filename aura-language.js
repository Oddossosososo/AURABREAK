/* AURA Script — tiny, safe DSL parser for AURABREAK.
   It parses .aura and .auracutsense text into data. It never evaluates source as JavaScript. */
(() => {
  "use strict";
  const auraRegistry = new Map();
  const cutsceneRegistry = new Map();
  const unquote = value => {
    const s = value.trim();
    if (s.startsWith('"') && s.endsWith('"')) {
      try { return JSON.parse(s); } catch { throw new Error("Invalid quoted string: " + s); }
    }
    if (s === "true") return true;
    if (s === "false") return false;
    if (/^-?\d+$/.test(s)) return Number(s);
    if (/^\d+(\.\d+)?e\d+$/i.test(s)) return Number(s);
    return s;
  };
  function parseBlock(source, expectedType) {
    if (typeof source !== "string") throw new TypeError("AURA source must be text.");
    const clean = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)#(?![0-9a-fA-F]{3,8}\b)[^\n]*/g, "$1");
    const head = clean.match(/^\s*(aura|cutscene)\s+"([^"]+)"\s*\{([\s\S]*)\}\s*$/i);
    if (!head) throw new Error("Expected: " + expectedType + ' "NAME" { ... }');
    const type = head[1].toLowerCase();
    if (type !== expectedType) throw new Error("This file needs a " + expectedType + " block.");
    const name = head[2].trim();
    const body = head[3];
    const result = { type, name, effects: [] };
    for (const [index, raw] of body.split(/\r?\n/).entries()) {
      const line = raw.trim();
      if (!line || line === "}" || line.startsWith("//")) continue;
      const match = line.match(/^([a-zA-Z][\w-]*)\s*:\s*(.*?)\s*;?$/);
      if (!match) throw new Error("Line " + (index + 2) + ": expected key: value");
      const key = match[1].toLowerCase();
      const value = unquote(match[2].replace(/;$/, "").trim());
      if (key === "effect") result.effects.push(String(value));
      else if (key === "reveal") result.reveal = String(value);
      else result[key] = value;
    }
    if (type === "aura") {
      if (!Number.isFinite(Number(result.odds)) || Number(result.odds) < 1) throw new Error("Aura odds must be at least 1.");
      if (result.color && !/^#[\da-f]{3}(?:[\da-f]{3})?$/i.test(result.color)) throw new Error("Color must be a hex value such as #b8a9ff.");
      result.odds = String(result.odds);
      auraRegistry.set(name.toUpperCase(), Object.freeze(result));
    } else {
      if (!Number.isFinite(Number(result.duration)) || Number(result.duration) < 0) throw new Error("Cutscene duration must be 0 or more milliseconds.");
      result.duration = Number(result.duration);
      cutsceneRegistry.set(name.toUpperCase(), Object.freeze(result));
    }
    return result;
  }
  function parseAura(source) { return parseBlock(source, "aura"); }
  function parseCutscene(source) { return parseBlock(source, "cutscene"); }
  window.AURA = Object.freeze({
    version: "0.1.0",
    parseAura,
    parseCutscene,
    getAura(name) { return auraRegistry.get(String(name).toUpperCase()) || null; },
    getCutscene(name) { return cutsceneRegistry.get(String(name).toUpperCase()) || null; },
    listAuras() { return [...auraRegistry.values()]; },
    listCutscenes() { return [...cutsceneRegistry.values()]; },
    registerAura(source) { return parseAura(source); },
    registerCutscene(source) { return parseCutscene(source); }
  });
})();