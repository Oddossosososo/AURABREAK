(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const AURAS = [
    {name:"DUST", odds:2, rarity:"COMMON", tier:"common", color:"#c3c4d8", symbol:"✧", description:"Every legend begins as a speck of dust.", style:"cosmic"},
    {name:"EMBER", odds:5, rarity:"COMMON", tier:"common", color:"#ff9b72", symbol:"♨", description:"A tiny spark that refuses to go out.", style:"cosmic"},
    {name:"TIDAL", odds:12, rarity:"UNCOMMON", tier:"uncommon", color:"#78e7c4", symbol:"≈", description:"The quiet pull of a distant ocean.", style:"cosmic"},
    {name:"STATIC", odds:25, rarity:"UNCOMMON", tier:"uncommon", color:"#78e7ff", symbol:"ϟ", description:"Reality crackles at your fingertips.", style:"cosmic"},
    {name:"MOONLIT", odds:60, rarity:"RARE", tier:"rare", color:"#72c6ff", symbol:"☾", description:"Silver light from a sleeping moon.", style:"cosmic"},
    {name:"PHANTOM", odds:120, rarity:"RARE", tier:"rare", color:"#93a1ff", symbol:"◈", description:"Something unseen has noticed you.", style:"cosmic"},
    {name:"GLITCH", odds:300, rarity:"EPIC", tier:"epic", color:"#b28aff", symbol:"⌁", description:"A little error in the fabric of everything.", style:"unimaginable"},
    {name:"NEBULA", odds:700, rarity:"EPIC", tier:"epic", color:"#db8aff", symbol:"✺", description:"A universe waiting to be born.", style:"cosmic"},
    {name:"SOLAR FLARE", odds:1500, rarity:"LEGENDARY", tier:"legendary", color:"#ffce77", symbol:"☼", description:"The sun remembers your name.", style:"divinity"},
    {name:"VOID WALKER", odds:5000, rarity:"LEGENDARY", tier:"legendary", color:"#a69bff", symbol:"◉", description:"You crossed the edge and kept walking.", style:"cosmic"},
    {name:"BLOOD MOON", odds:12000, rarity:"MYTHIC", tier:"mythic", color:"#ff7cae", symbol:"☽", description:"An omen written across the night.", style:"fallen"},
    {name:"STARFORGED", odds:35000, rarity:"MYTHIC", tier:"mythic", color:"#ffe6a6", symbol:"✦", description:"Forged in the heart of a dying star.", style:"divinity"},
    {name:"COSMIC", odds:100000, rarity:"COSMIC", tier:"cosmic", color:"#8a9dff", symbol:"✧", description:"The cosmos opens one eye.", style:"cosmic"},
    {name:"THE UNIMAGINABLE", odds:1000000, rarity:"TRANSCENDENT", tier:"divine", color:"#b8ffff", symbol:"∞", description:"Your mind reaches for a shape it cannot hold.", style:"unimaginable"},
    {name:"FALLEN ANGEL", odds:7777777, rarity:"DIVINE", tier:"divine", color:"#e3c4ff", symbol:"♱", description:"A celestial presence, cast out of forever.", style:"fallen"},
    {name:"DIVINITY", odds:100000000, rarity:"DIVINE", tier:"divine", color:"#fff0a0", symbol:"✹", description:"For one impossible moment, everything kneels.", style:"divinity"},
    {name:"UNSIN­FUL".replace("­",""), odds:1234567899876543211234567890n, rarity:"UNSINFUL", tier:"secret", color:"#ff4df0", symbol:"⟁", description:"A shapeless anomaly beyond every known law.", style:"unsinful", secret:true}
  ];
  const STORAGE_KEY = "aurabreak-discoveries-v1";
  let discovered = loadDiscoveries();
  let rolling = false;
  let pendingAura = null;
  let toastTimer;

  function loadDiscoveries() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return new Set(saved.filter(name => AURAS.some(a => a.name === name)));
    } catch { return new Set(); }
  }
  function saveDiscoveries() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...discovered])); }
    catch { showToast("Browser storage is unavailable; progress may not save."); }
  }
  function formatOdds(odds) {
    return "1 in " + BigInt(odds).toLocaleString("en-US");
  }
  function chooseAura() {
    // The prototype uses weighted random selection; UNSINFUL retains the requested exact odds display.
    const roll = Math.random();
    const pool = AURAS.filter(a => !a.secret);
    const total = pool.reduce((sum, aura) => sum + 1 / Number(aura.odds), 0);
    let cursor = roll * total;
    for (const aura of pool) {
      cursor -= 1 / Number(aura.odds);
      if (cursor <= 0) return aura;
    }
    return pool[0];
  }
  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }
  function renderResult(aura, isNew) {
    const content = $("resultContent");
    content.innerHTML = "";
    const symbol = document.createElement("div");
    symbol.className = "empty-symbol";
    symbol.textContent = aura.symbol;
    symbol.style.color = aura.color;
    symbol.style.borderColor = aura.color + "66";
    symbol.style.boxShadow = "0 0 25px " + aura.color + "22";
    const overline = document.createElement("p");
    overline.className = "result-overline";
    overline.textContent = isNew ? "NEW DISCOVERY" : "ALREADY DISCOVERED";
    const title = document.createElement("h2");
    title.textContent = aura.name;
    title.style.color = aura.color;
    const description = document.createElement("p");
    description.className = "result-description";
    description.textContent = aura.description;
    const divider = document.createElement("div");
    divider.className = "result-divider";
    content.append(symbol, overline, title, description, divider);
    [
      ["RARITY", aura.rarity],
      ["ODDS", formatOdds(aura.odds)],
      ["STATUS", isNew ? "DISCOVERED" : "IN COLLECTION"]
    ].forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "stat-row";
      const left = document.createElement("span"); left.textContent = label;
      const right = document.createElement("strong"); right.textContent = value;
      if (label === "STATUS") right.style.color = aura.color;
      row.append(left, right); content.append(row);
    });
    $("orbCore").style.background = "radial-gradient(circle at 35% 28%,#fff," + aura.color + " 23%,#211a3c 72%)";
    $("orbCore").style.boxShadow = "0 0 35px " + aura.color + "88,0 0 95px " + aura.color + "33,inset 0 0 20px #fff5";
    $("orbCore").querySelector(".orb-glyph").textContent = aura.symbol;
    $("orbCore").querySelector(".orb-glyph").style.color = aura.color;
    $("stageLabel").textContent = aura.name + " // " + aura.rarity;
  }
  function renderCollection() {
    const grid = $("auraGrid");
    grid.innerHTML = "";
    const sorted = AURAS.filter(a => discovered.has(a.name)).sort((a,b) => Number(a.odds) - Number(b.odds));
    $("collectionCount").textContent = String(discovered.size);
    $("progressFill").style.width = Math.min(100, discovered.size) + "%";
    if (!sorted.length) {
      const empty = document.createElement("div");
      empty.className = "collection-empty";
      empty.innerHTML = "<span>◇</span><p>No auras discovered yet.</p><small>YOUR FIRST DISCOVERY IS ONE ROLL AWAY.</small>";
      grid.append(empty);
      return;
    }
    sorted.forEach((aura, index) => {
      const tile = document.createElement("article");
      tile.className = "aura-tile " + aura.tier;
      tile.style.animationDelay = Math.min(index * 35, 350) + "ms";
      const rarity = document.createElement("span"); rarity.className = "tile-rarity"; rarity.textContent = aura.rarity;
      const symbol = document.createElement("div"); symbol.className = "tile-symbol"; symbol.textContent = aura.symbol;
      const name = document.createElement("div"); name.className = "tile-name"; name.textContent = aura.name;
      const odds = document.createElement("div"); odds.className = "tile-odds"; odds.textContent = formatOdds(aura.odds);
      tile.append(rarity, symbol, name, odds); grid.append(tile);
    });
  }
  function showCutscene(aura) {
    const cutscene = $("cutscene");
    cutscene.dataset.style = aura.style || "cosmic";
    cutscene.style.setProperty("--aura-color", aura.color);
    $("cutsceneTitle").textContent = aura.name;
    $("cutsceneTitle").style.color = aura.color;
    $("cutsceneEyebrow").textContent = aura.secret ? "UNCLASSIFIED REALITY FAILURE" : aura.odds >= 1000000 ? "ANOMALY EVENT DETECTED" : "A NEW FORCE HAS AWAKENED";
    $("cutsceneSubtitle").textContent = aura.secret ? "THE RULES NO LONGER APPLY." : aura.description.toUpperCase();
    $("cutsceneArt").textContent = "";
    cutscene.classList.remove("hidden");
    cutscene.setAttribute("aria-hidden", "false");
  }
  function closeCutscene() {
    $("cutscene").classList.add("hidden");
    $("cutscene").setAttribute("aria-hidden", "true");
    if (pendingAura) {
      renderResult(pendingAura, !discovered.has(pendingAura.name));
      pendingAura = null;
    }
  }
  function roll() {
    if (rolling) return;
    rolling = true;
    $("rollButton").disabled = true;
    document.body.classList.add("rolling");
    $("stageLabel").textContent = "REALITY IS REARRANGING...";
    const aura = chooseAura();
    setTimeout(() => {
      rolling = false;
      $("rollButton").disabled = false;
      document.body.classList.remove("rolling");
      const isNew = !discovered.has(aura.name);
      discovered.add(aura.name);
      saveDiscoveries();
      renderCollection();
      renderResult(aura, isNew);
      if (aura.secret || aura.odds >= 1000000) {
        pendingAura = aura;
        showCutscene(aura);
      } else if (isNew) {
        showToast("NEW DISCOVERY: " + aura.name);
      } else {
        showToast(aura.name + " — already in your collection.");
      }
    }, 950);
  }
  $("rollButton").addEventListener("click", roll);
  $("closeCutscene").addEventListener("click", closeCutscene);
  $("cutscene").addEventListener("click", event => { if (event.target === $("cutscene")) closeCutscene(); });
  document.addEventListener("keydown", event => {
    if (event.code === "Space" && !/INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName) && $("cutscene").classList.contains("hidden")) {
      event.preventDefault(); roll();
    }
    if (event.code === "Escape" && !$("cutscene").classList.contains("hidden")) closeCutscene();
  });
  renderCollection();
})();