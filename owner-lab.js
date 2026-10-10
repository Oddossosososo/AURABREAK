(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const SUPABASE_URL = "https://acwdieavymmvhqilllvp.supabase.co";
  const SUPABASE_KEY = "sb_publishable_HvQ5ZcGKmVKhkhrz9Z3Afw_S6-ADCys";
  const SAVE_KEY = "aurabreak_owner_lab_definitions_v1";
  let authorized = false;
  let client = null;

  const examples = {
    aura: 'aura "STAR EATER" {\n  odds: 1000000000\n  rarity: "CUSTOM / DIVINE"\n  color: "#b8a9ff"\n  symbol: "✦"\n  description: "A star swallowed by the void."\n  cutscene: "STAR EATER"\n}',
    cutscene: 'cutscene "STAR EATER" {\n  duration: 5000\n  title: "STAR EATER"\n  subtitle: "THE LIGHT GOES QUIET."\n  effect: "flash"\n  effect: "shake"\n  reveal: "STAR EATER"\n}',
    roll: 'roll "OWNER_POOL" {\n  base_luck: 1\n  aura: "STAR EATER"\n}'
  };

  function setAuth(title, message, retry = false) {
    $("authTitle").textContent = title;
    $("authMessage").textContent = message;
    $("authRetry").hidden = !retry;
  }
  async function authorize() {
    authorized = false;
    $("workspace").hidden = true;
    $("authCard").hidden = false;
    setAuth("VERIFYING DEV ACCESS", "Checking your AURABREAK authorization…");
    if (!window.supabase?.createClient) {
      setAuth("AUTH CLIENT UNAVAILABLE", "Supabase did not load. Check your connection, then retry.", true);
      return;
    }
    try {
      if (!client) client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      let {data: sessionData, error: sessionError} = await client.auth.getSession();
      if (sessionError) throw sessionError;
      if (!sessionData.session) {
        setAuth("CREATING DEV SESSION", "Starting a passwordless session…");
        const {data, error} = await client.auth.signInAnonymously();
        if (error) throw error;
        sessionData = {session: data.session};
      }
      const {data, error} = await client.functions.invoke("dev-auth");
      if (error) throw error;
      if (!data?.isDev) {
        const userId = sessionData.session?.user?.id || "Unavailable";
        setAuth("ACCESS NOT APPROVED", "Your session is ready, but DEV access is not approved. User ID: " + userId + ". Send that ID to the project owner for approval.", true);
        return;
      }
      authorized = true;
      $("authCard").hidden = true;
      $("workspace").hidden = false;
      $("statusPill").textContent = "DEV VERIFIED";
      loadSavedDefinitions();
      renderSaved();
    } catch (error) {
      setAuth("AUTH CHECK FAILED", error?.message || String(error), true);
    }
  }

  function activeType() { return $("fileType").value; }
  function parseSource(type, source) {
    if (!window.AURA) throw new Error("AURA Script runtime is unavailable. Refresh and retry.");
    if (type === "aura") return AURA.registerAura(source);
    if (type === "cutscene") return AURA.registerCutscene(source);
    return AURA.registerRoll(source);
  }
  function nameFor(type, parsed) { return parsed.name || "Untitled"; }
  function setOutput(kind, title, detail) {
    const output = $("output");
    output.className = "output " + kind;
    output.replaceChildren();
    const strong = document.createElement("strong");
    strong.textContent = title;
    const span = document.createElement("span");
    span.textContent = detail;
    output.append(strong, span);
    $("statusPill").textContent = kind === "error" ? "ERROR" : kind === "success" ? "VALID" : "READY";
  }
  function validate() {
    if (!authorized) return setOutput("error", "ACCESS DENIED", "Verify DEV access first.");
    try {
      const type = activeType();
      const parsed = parseSource(type, $("sourceEditor").value);
      setOutput("success", "VALID · " + parsed.name, describe(type, parsed));
      return {type, parsed, source: $("sourceEditor").value};
    } catch (error) {
      setOutput("error", "VALIDATION FAILED", error?.message || String(error));
      return null;
    }
  }
  function describe(type, p) {
    if (type === "aura") return "Aura definition registered in this page session · odds 1 in " + p.odds + (p.rarity ? " · " + p.rarity : "");
    if (type === "cutscene") return "Cutscene definition registered in this page session · " + p.duration + " ms · " + p.effects.length + " effect command(s)";
    return "Roll pool registered in this page session · " + p.auras.length + " aura reference(s) · base luck " + p.base_luck;
  }
  function readSaved() {
    try {
      const value = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]");
      return Array.isArray(value) ? value.filter(x => x && ["aura","cutscene","roll"].includes(x.type) && typeof x.source === "string") : [];
    } catch { return []; }
  }
  function writeSaved(items) {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(items)); return true; }
    catch { setOutput("error", "SAVE FAILED", "Browser storage may be full or disabled."); return false; }
  }
  function saveCurrent() {
    const result = validate();
    if (!result) return;
    const saved = readSaved();
    const key = result.type + ":" + result.parsed.name.toUpperCase();
    const entry = {type:result.type,name:result.parsed.name,source:result.source,updatedAt:new Date().toISOString()};
    const index = saved.findIndex(x => x.type + ":" + String(x.name).toUpperCase() === key);
    if (index >= 0) saved[index] = entry; else saved.unshift(entry);
    if (writeSaved(saved)) { renderSaved(); setOutput("success", "SAVED LOCALLY", entry.name + " is saved in this browser."); }
  }
  function extension(type) { return type === "aura" ? ".aura" : type === "cutscene" ? ".auracutsense" : ".auraroll"; }
  function exportCurrent() {
    const result = validate();
    if (!result) return;
    const blob = new Blob([result.source.trim() + "\n"], {type:"text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.parsed.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") + extension(result.type);
    document.body.append(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    setOutput("success", "FILE EXPORTED", "Downloaded " + a.download + ". Add it to the repository to keep it permanently.");
  }
  function renderSaved() {
    const list = $("savedList");
    list.replaceChildren();
    const items = readSaved();
    if (!items.length) { const p = document.createElement("p"); p.className="empty"; p.textContent="No local definitions saved yet."; list.append(p); return; }
    items.forEach((item, index) => {
      const row = document.createElement("div"); row.className="saved-entry";
      const info = document.createElement("div");
      const title = document.createElement("strong"); title.textContent=item.name;
      const meta = document.createElement("small"); meta.textContent="." + (item.type === "cutscene" ? "auracutsense" : item.type === "roll" ? "auraroll" : "aura") + " · " + new Date(item.updatedAt || Date.now()).toLocaleString();
      info.append(title, meta);
      const load = document.createElement("button"); load.className="subtle"; load.textContent="LOAD"; load.addEventListener("click", () => {
        if (!authorized) return;
        $("fileType").value=item.type; $("sourceEditor").value=item.source;
        validate(); window.scrollTo({top:0,behavior:"smooth"});
      });
      const download = document.createElement("button"); download.className="subtle"; download.textContent="EXPORT";
      download.addEventListener("click", () => {
        const blob=new Blob([item.source.trim()+"\n"],{type:"text/plain;charset=utf-8"});
        const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url;
        a.download=String(item.name).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+extension(item.type);
        document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);
      });
      const remove = document.createElement("button"); remove.className="subtle danger"; remove.textContent="DELETE";
      remove.addEventListener("click", () => { const current=readSaved(); current.splice(index,1); writeSaved(current); renderSaved(); });
      row.append(info,load,download,remove); list.append(row);
    });
  }
  function loadSavedDefinitions() {
    if (!window.AURA) return;
    for (const item of readSaved()) {
      try { parseSource(item.type,item.source); } catch {}
    }
  }
  $("fileType").addEventListener("change", () => {
    $("sourceEditor").value=examples[activeType()];
    setOutput("ready","EDITOR READY","Load an example or write a definition.");
  });
  $("loadExample").addEventListener("click", () => { $("sourceEditor").value=examples[activeType()]; setOutput("ready","EXAMPLE LOADED","Edit it, then validate."); });
  $("validateButton").addEventListener("click", validate);
  $("saveButton").addEventListener("click", saveCurrent);
  $("exportButton").addEventListener("click", exportCurrent);
  $("clearSaved").addEventListener("click", () => {
    if (!authorized) return;
    if (window.confirm("Delete all Owner Lab definitions saved in this browser?")) {
      localStorage.removeItem(SAVE_KEY); renderSaved(); setOutput("ready","LOCAL SAVES CLEARED","Exported files and GitHub files are not affected.");
    }
  });
  $("authRetry").addEventListener("click", authorize);
  $("sourceEditor").value=examples.aura;
  authorize();
})();