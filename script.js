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
    {name:"LOTTERY", odds:292201338, rarity:"LOTTERY", tier:"secret", color:"#79ffb0", symbol:"🎟️", description:"A one-in-292,201,338 miracle.", style:"divinity"},
    {name:"BLOOD MOON", odds:12000, rarity:"MYTHIC", tier:"mythic", color:"#ff7cae", symbol:"☽", description:"An omen written across the night.", style:"fallen"},
    {name:"STARFORGED", odds:35000, rarity:"MYTHIC", tier:"mythic", color:"#ffe6a6", symbol:"✦", description:"Forged in the heart of a dying star.", style:"divinity"},
    {name:"COSMIC", odds:100000, rarity:"COSMIC", tier:"cosmic", color:"#8a9dff", symbol:"✧", description:"The cosmos opens one eye.", style:"cosmic"},
    {name:"THE UNIMAGINABLE", odds:1000000, rarity:"TRANSCENDENT", tier:"divine", color:"#b8ffff", symbol:"∞", description:"Your mind reaches for a shape it cannot hold.", style:"unimaginable"},
    {name:"FALLEN ANGEL", odds:7777777, rarity:"DIVINE", tier:"divine", color:"#e3c4ff", symbol:"♱", description:"A celestial presence, cast out of forever.", style:"fallen"},
    {name:"DIVINITY", odds:100000000, rarity:"DIVINE", tier:"divine", color:"#fff0a0", symbol:"✹", description:"For one impossible moment, everything kneels.", style:"divinity"},
    {name:"PURE DEITY", odds:1000000000000000000000000000000000000n, rarity:"GOD • RANK 7", tier:"secret", color:"#fff4d6", symbol:"✧", description:"The weakest of the five original gods. It still believes it is the strongest.", style:"pure-deity", secret:true, god:true},
    {name:"CHAOTIC END", odds:10n ** 42n, rarity:"GOD • RANK 6", tier:"secret", color:"#ff435f", symbol:"⟁", description:"The god of chaos. It believes no power can stand above it.", style:"chaotic-end", secret:true, god:true},
    {name:"GLITCHED SCREAMS", odds:10n ** 48n, rarity:"GOD • RANK 5", tier:"secret", color:"#f44dff", symbol:"⌁", description:"A god whose existence corrupts the rules of reality.", style:"glitched-screams", secret:true, god:true},
    {name:"LORE CREATIONIST", odds:10n ** 54n, rarity:"GOD • RANK 4", tier:"secret", color:"#65caff", symbol:"✥", description:"The god who shaped the stories and history of the universe.", style:"lore-creationist", secret:true, god:true},
    {name:"THE MAKER", odds:10n ** 60n, rarity:"GOD • RANK 3", tier:"secret", color:"#ffcf76", symbol:"✹", description:"Creator of the world. It believes nothing exists above it.", style:"the-maker", secret:true, god:true},
    {name:"THE FALLEN GOD", odds:10n ** 72n, rarity:"THE TRUE SOVEREIGN", tier:"secret", color:"#f4e8ff", symbol:"✦", description:"The one who knows the truth and controls AURABREAK itself.", style:"fallen-god", secret:true, adminOnly:true, god:true},
    {name:"DEVELOPER", odds:10n ** 100n, rarity:"RANK 0 • THE REAL CREATOR", tier:"secret", color:"#ffffff", symbol:"⟡", description:"The true strongest. The author beyond the Fallen God, who can rewrite the rules of AURABREAK.", style:"developer", secret:true, adminOnly:true, god:true},
    {name:"PURE DEITY:GALACTIC", odds:2n * (10n ** 68n), rarity:"GALACTIC EVOLUTION", tier:"secret", color:"#9be7ff", symbol:"✦", description:"Wait... I remember you. The deity has shattered its own limits.", style:"galactic", secret:true},
    {name:"UNSIN­FUL".replace("­",""), odds:1234567899876543211234567890n, rarity:"UNSINFUL", tier:"secret", color:"#ff4df0", symbol:"⟁", description:"A shapeless anomaly beyond every known law.", style:"unsinful", secret:true}
  ];
  const STORAGE_KEY = "aurabreak-discoveries-v1";
  const TRANSCENDENCE_KEY = "aurabreak-transcendence-unlocked-v1";
  const ORIGINAL_GODS = ["PURE DEITY", "CHAOTIC END", "GLITCHED SCREAMS", "LORE CREATIONIST", "THE MAKER"];
  let transcendenceUnlocked = localStorage.getItem(TRANSCENDENCE_KEY) === "yes";
  let transcendencePending = false;
  let discovered = loadDiscoveries();
  let rolling = false;
  let forcedAura = null;
  let luckMultiplier = 1;
  let pendingAura = null;
  let cutsceneTimers = [];
  let deityAudio = null;
  let toastTimer;
  let runRollCount = 0;
  let pureDeityEncounters = 0;

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
    if (forcedAura) {
      const selected = forcedAura;
      forcedAura = null;
      return selected;
    }
    // Test each aura from rarest to most common. Luck scales its one-in-X chance.
    // If luck meets/exceeds an aura's base odds, that aura is guaranteed to pass;
    // because we test rarest first, the rarest eligible aura wins.
    const pool = AURAS.filter(a => !a.adminOnly).sort((a, b) => {
      const ao = Number(a.odds), bo = Number(b.odds);
      return bo - ao;
    });
    const luck = Math.max(1, Number.isFinite(luckMultiplier) ? luckMultiplier : Number.MAX_VALUE);
    for (const aura of pool) {
      const odds = Number(aura.odds);
      const chance = Math.min(1, luck / odds);
      if (Math.random() < chance) return aura;
    }
    return AURAS[0];
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
  function stopDeityCutscene() {
    cutsceneTimers.forEach(clearTimeout);
    cutsceneTimers = [];
    if (deityAudio) {
      try { deityAudio.close(); } catch {}
      deityAudio = null;
    }
  }
  function playDeityTone(frequency, duration, type = "sine", volume = 0.06) {
    try {
      if (!deityAudio) deityAudio = new (window.AudioContext || window.webkitAudioContext)();
      if (deityAudio.state === "suspended") deityAudio.resume();
      const oscillator = deityAudio.createOscillator();
      const gain = deityAudio.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, deityAudio.currentTime);
      gain.gain.setValueAtTime(volume, deityAudio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, deityAudio.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(deityAudio.destination);
      oscillator.start();
      oscillator.stop(deityAudio.currentTime + duration);
    } catch {}
  }
  function startPureDeityCutscene() {
    const cutscene = $("cutscene");
    const art = $("cutsceneArt");
    const content = cutscene.querySelector(".cutscene-content");
    const eyebrow = $("cutsceneEyebrow");
    const title = $("cutsceneTitle");
    const subtitle = $("cutsceneSubtitle");
    const button = $("closeCutscene");
    stopDeityCutscene();
    cutscene.dataset.style = "pure-deity";
    cutscene.style.setProperty("--aura-color", "#fff4d6");
    cutscene.style.setProperty("--deity-gold", "#ffe9a8");
    cutscene.style.setProperty("--deity-violet", "#9c78ff");
    cutscene.style.setProperty("--deity-cyan", "#9cf5ff");
    art.innerHTML = '<div class="deity-vortex"></div><div class="deity-sigil">✧</div><div class="deity-star">✦</div><div class="deity-halo halo-one"></div><div class="deity-halo halo-two"></div><div class="deity-rays"></div><div class="deity-flash"></div><div class="deity-specks"></div>';
    eyebrow.textContent = "A SIGNAL FROM BEYOND REALITY";
    title.textContent = "";
    title.style.color = "#fff4d6";
    subtitle.textContent = "";
    button.textContent = "SKIP CUTSCENE ↗";
    content.classList.remove("deity-reveal");
    cutscene.classList.add("deity-running");
    const showLine = (line, className = "") => {
      title.textContent = line;
      title.className = className;
      content.classList.remove("deity-reveal");
      void content.offsetWidth;
      content.classList.add("deity-reveal");
    };
    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    // 45-second celestial sequence: no "DOOF" text or beat-word effects.
    showLine("So...", "deity-line");
    subtitle.textContent = "SOMETHING HAS ANSWERED.";
    later(4500, () => { showLine("You found it.", "deity-line"); subtitle.textContent = "AGAINST EVERY EXPECTATION."; playDeityTone(420, 1.2); });
    later(10000, () => { showLine("PURE DEITY", "deity-line deity-name-flash"); subtitle.textContent = "THE RAREST AURA IN AURABREAK"; playDeityTone(660, 1.1, "triangle"); });
    later(15500, () => { showLine("The RNG gods", "deity-line"); subtitle.textContent = "HAVE BEEN WATCHING."; playDeityTone(520, 1.4); });
    later(20000, () => { showLine("have blessed you..", "deity-line deity-blessed"); subtitle.textContent = "THIS WILL NOT HAPPEN TWICE."; playDeityTone(880, 1.8, "sine", 0.08); });
    later(27000, () => { showLine("", "deity-beat"); subtitle.textContent = "THE SILENCE BEFORE CREATION."; playDeityTone(220, 1.4, "sine", 0.09); });
    later(31000, () => { showLine("", "deity-beat"); playDeityTone(330, 1.2, "triangle", 0.1); });
    later(33700, () => { showLine("", "deity-beat deity-fast"); playDeityTone(440, 0.9, "sine", 0.12); });
    later(35500, () => { showLine("", "deity-boom"); subtitle.textContent = ""; cutscene.classList.add("deity-impact"); playDeityTone(55, 2.6, "sawtooth", 0.2); });
    later(38000, () => { cutscene.classList.remove("deity-impact"); showLine("PURE DEITY", "deity-final-title"); subtitle.textContent = "THE RNG GODS HAVE BLESSED YOU."; eyebrow.textContent = "ABSOLUTE RARITY • 1 IN " + BigInt(AURAS.find(a => a.name === "PURE DEITY").odds).toLocaleString("en-US"); content.classList.add("deity-reveal"); });
    later(45000, () => { cutscene.classList.remove("deity-running"); button.textContent = "CLAIM DISCOVERY ↗"; });
  }
  function startGalacticCutscene() {
    const cutscene = $("cutscene");
    const art = $("cutsceneArt");
    const content = cutscene.querySelector(".cutscene-content");
    const title = $("cutsceneTitle");
    const subtitle = $("cutsceneSubtitle");
    const eyebrow = $("cutsceneEyebrow");
    const button = $("closeCutscene");
    stopDeityCutscene();

    // The second encounter deliberately begins as the original PURE DEITY reveal.
    // The fake-out then smoothly evolves into GALACTIC instead of revealing it immediately.
    cutscene.dataset.style = "pure-deity";
    cutscene.style.setProperty("--aura-color", "#fff4d6");
    cutscene.style.setProperty("--deity-gold", "#ffe9a8");
    cutscene.style.setProperty("--deity-violet", "#9c78ff");
    cutscene.style.setProperty("--deity-cyan", "#9cf5ff");
    art.innerHTML = '<div class="deity-vortex"></div><div class="deity-sigil">✧</div><div class="deity-star">✦</div><div class="deity-halo halo-one"></div><div class="deity-halo halo-two"></div><div class="deity-rays"></div><div class="deity-flash"></div><div class="deity-specks"></div>';
    eyebrow.textContent = "A SIGNAL FROM BEYOND REALITY";
    title.textContent = "PURE DEITY";
    title.className = "deity-line deity-name-flash";
    title.style.color = "#fff4d6";
    subtitle.textContent = "THE RNG GODS HAVE BLESSED YOU.";
    button.textContent = "SKIP EVOLUTION ↗";
    content.classList.remove("deity-reveal");
    cutscene.classList.add("deity-running", "galactic-running");
    void content.offsetWidth;
    content.classList.add("deity-reveal");

    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    const showLine = (line, sub, cls = "galactic-line") => {
      title.textContent = line;
      title.className = cls;
      subtitle.textContent = sub;
      content.classList.remove("deity-reveal");
      void content.offsetWidth;
      content.classList.add("deity-reveal");
    };
    const smoothFlash = () => {
      cutscene.classList.add("galactic-break");
      playDeityTone(70, 2.2, "sawtooth", 0.12);
      later(850, () => cutscene.classList.remove("galactic-break"));
    };

    // Gentle, original trance arpeggio made with Web Audio; no external audio assets.
    try {
      if (!deityAudio) deityAudio = new (window.AudioContext || window.webkitAudioContext)();
      if (deityAudio.state === "suspended") deityAudio.resume();
      const ctx = deityAudio, startAt = ctx.currentTime + 0.08;
      const notes = [110,164.81,220,329.63,440,329.63,220,164.81,123.47,185,246.94,370,493.88,370,246.94,185];
      notes.forEach((hz, i) => {
        const at = startAt + i * 0.28;
        const osc = ctx.createOscillator(), gain = ctx.createGain(), filter = ctx.createBiquadFilter();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(hz, at);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1800, at);
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.exponentialRampToValueAtTime(0.035, at + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.26);
        osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
        osc.start(at); osc.stop(at + 0.27);
      });
      [55,55,82.4,110,82.4,123.47].forEach((hz, i) => {
        const at = startAt + 0.5 + i * 0.72;
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.type = "sine"; osc.frequency.setValueAtTime(hz, at);
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.exponentialRampToValueAtTime(0.075, at + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.68);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(at); osc.stop(at + 0.7);
      });
    } catch {}

    later(2400, () => {
      showLine("So...", "YOU FOUND IT AGAIN.", "deity-line");
      playDeityTone(420, 1.1, "sine", 0.045);
    });
    later(4700, () => {
      showLine("PURE DEITY", "THIS WILL NOT HAPPEN TWICE.", "deity-line deity-name-flash");
      playDeityTone(660, 1.2, "triangle", 0.055);
    });
    later(7300, () => {
      showLine("Wait...", "I REMEMBER YOU...", "galactic-line");
      eyebrow.textContent = "AN IMPOSSIBLE MEMORY HAS AWAKENED";
      cutscene.dataset.style = "galactic";
      cutscene.style.setProperty("--aura-color", "#8be7ff");
      playDeityTone(440, 1.5, "triangle", 0.065);
    });
    later(9800, () => {
      showLine("I remember you...", "THE FIRST DIVINITY WAS ONLY THE BEGINNING.", "galactic-line");
      art.innerHTML = '<div class="galactic-nebula"></div><div class="galactic-orb"><span>✦</span></div><div class="galactic-shards"></div><div class="galactic-rings"></div><div class="galactic-flare"></div>';
      smoothFlash();
    });
    later(12600, () => {
      showLine("THE ORB REMEMBERS", "REALITY CANNOT CONTAIN THIS FORM.", "galactic-line");
      cutscene.classList.add("galactic-break");
      playDeityTone(82.4, 1.8, "sawtooth", 0.1);
    });
    later(15100, () => {
      cutscene.classList.remove("galactic-break");
      showLine("PURE DEITY", "HAS EVOLVED BEYOND ITSELF.", "galactic-line");
    });
    later(18100, () => {
      smoothFlash();
      showLine("PURE DEITY:GALACTIC", "THE STARS ARE ONLY THE BEGINNING.", "galactic-final");
      eyebrow.textContent = "GALACTIC EVOLUTION • 1 IN " + BigInt(AURAS.find(a => a.name === "PURE DEITY:GALACTIC").odds).toLocaleString("en-US");
      content.classList.add("deity-reveal");
    });
    later(24500, () => {
      cutscene.classList.remove("deity-running");
      button.textContent = "CLAIM EVOLUTION ↗";
    });
  }
  const MOVIE_SCENES = {
    "LOTTERY": {slug:"lottery", eyebrow:"PROBABILITY HAS LOST ITS MEANING", lines:["A TICKET WAS NEVER SUPPOSED TO EXIST.","ONE CHANCE. ONE IMPOSSIBLE MOMENT.","THE UNIVERSE DREW YOUR NUMBER.","LOTTERY"], subtitles:["A SINGLE GOLDEN SIGNAL.","THE ODDS WERE NEVER ON YOUR SIDE.","AND YET... HERE YOU ARE.","1 IN 292,201,338 • THE JACKPOT OF REALITY"], notes:[392,523.25,659.25,783.99]},
    "SOLAR FLARE": {slug:"solar", eyebrow:"STELLAR CORE BREACH", lines:["THE SUN GOES QUIET.","A THOUSAND SUNRISES COLLAPSE INTO ONE.","THE CORE REMEMBERS YOUR NAME.","SOLAR FLARE"], subtitles:["LIGHT IS GATHERING.","THE HORIZON IS BURNING.","DO NOT LOOK AWAY.","A STAR HAS CHOSEN YOU"], notes:[220,330,440,660]},
    "VOID WALKER": {slug:"void", eyebrow:"OUTSIDE THE KNOWN UNIVERSE", lines:["THE STARS HAVE STOPPED.","THERE IS NO FLOOR HERE.","SOMETHING CROSSES THE EMPTY.","VOID WALKER"], subtitles:["SIGNAL LOST.","REALITY HAS AN EDGE.","YOU CROSSED IT ANYWAY.","THE VOID KNOWS YOUR FOOTSTEPS"], notes:[196,146.83,110,73.42]},
    "STARFORGED": {slug:"starforged", eyebrow:"FORGE OF THE FIRST STAR", lines:["A STAR IS DYING.","ITS LAST LIGHT BECOMES A HAMMER.","THE COSMOS FORGES A NEW LEGEND.","STARFORGED"], subtitles:["MATTER BENDS.","THE ANVIL OF CREATION.","EVERY SPARK IS A GALAXY.","BORN FROM A SUPERNOVA"], notes:[261.63,329.63,392,523.25]},
    "COSMIC": {slug:"cosmic", eyebrow:"DEEP-SPACE SYNCHRONIZATION", lines:["A SIGNAL BETWEEN GALAXIES.","THE NEBULA OPENS LIKE AN EYE.","THE UNIVERSE ANSWERS BACK.","COSMIC"], subtitles:["DISTANCE: MEANINGLESS.","STARDUST IN PERFECT ORBIT.","A NEW CONSTELLATION FORMS.","THE COSMOS HAS NOTICED YOU"], notes:[174.61,261.63,349.23,523.25]},
    "THE UNIMAGINABLE": {slug:"unimaginable", eyebrow:"COGNITIVE HORIZON EXCEEDED", lines:["DO NOT TRY TO NAME IT.","THE SHAPE CHANGES WHEN YOU BLINK.","YOUR MIND CAN ONLY SEE THE SHADOW.","THE UNIMAGINABLE"], subtitles:["FORM: UNRESOLVED.","DIMENSIONS ARE UNFOLDING.","MEANING IS BREAKING APART.","THERE WAS NEVER A WORD FOR THIS"], notes:[207.65,311.13,466.16,622.25]},
    "FALLEN ANGEL": {slug:"fallen", eyebrow:"CELESTIAL EXILE DETECTED", lines:["THE HEAVENS CLOSE THEIR GATES.","ONE WING FALLS THROUGH THE DARK.","THE EXILE TURNS TO FACE YOU.","FALLEN ANGEL"], subtitles:["A HALO, CRACKED.","GRACE BECOMES GRAVITY.","THE LAST CHOIR FALLS SILENT.","BANISHED FROM ETERNITY"], notes:[293.66,220,164.81,246.94]},
    "DIVINITY": {slug:"divinity", eyebrow:"A LAW OF REALITY HAS BENT", lines:["EVERYTHING STANDS STILL.","THE LIGHT ARRIVES BEFORE THE SOUND.","FOR ONE MOMENT, ALL THINGS KNEEL.","DIVINITY"], subtitles:["TIME: SUSPENDED.","THE SKY IS OPENING.","YOU ARE WITNESS TO THE IMPOSSIBLE.","A PRESENCE BEYOND WORSHIP"], notes:[261.63,392,523.25,783.99]},
    "PURE DEITY": {slug:"pure", eyebrow:"ABSOLUTE PRESENCE DETECTED", lines:["THE WORLD FORGETS TO BREATHE.","A LIGHT OLDER THAN CREATION.","YOU HAVE REACHED THE UNREACHABLE.","PURE DEITY"], subtitles:["NO RECORDS FOUND.","EVERY POSSIBILITY FALLS AWAY.","THE RNG GODS HAVE BEEN WATCHING.","THIS WILL NOT HAPPEN TWICE."], notes:[329.63,440,659.25,880]},
    "UNSINFUL": {slug:"unsinful", eyebrow:"ANOMALY WITHOUT A SHAPE", lines:["THE IMAGE REFUSES TO SETTLE.","THOUGHT BECOMES COLOUR.","THE RULES ERASE THEMSELVES.","UNSINFUL"], subtitles:["FORM: INFINITE.","CAUSALITY: UNDEFINED.","REALITY CANNOT CLASSIFY THIS.","THE UNWRITTEN HAS ARRIVED"], notes:[311.13,466.16,622.25,932.33]}
  };
  function startAuraMovie(aura) {
    const cutscene = $("cutscene"), art = $("cutsceneArt");
    const content = cutscene.querySelector(".cutscene-content");
    const eyebrow = $("cutsceneEyebrow"), title = $("cutsceneTitle"), subtitle = $("cutsceneSubtitle");
    const button = $("closeCutscene");
    stopDeityCutscene();
    const scene = MOVIE_SCENES[aura.name] || {
      slug:"cosmic", eyebrow:"REALITY DISTORTION DETECTED",
      lines:["THE AIR STARTS TO HUM.","LIGHT GATHERS AROUND THE ORB.","THE WORLD MAKES ROOM FOR SOMETHING NEW.",aura.name],
      subtitles:["AN UNKNOWN SIGNAL.","ENERGY LEVELS RISING.","A NEW FORCE HAS AWAKENED.",aura.description.toUpperCase()],
      notes:[220,329.63,440,587.33]
    };
    cutscene.dataset.aura = aura.name;
    cutscene.dataset.style = aura.style || "cosmic";
    cutscene.style.setProperty("--aura-color", aura.color);
    cutscene.style.setProperty("--movie-color", aura.color);
    art.innerHTML = '<div class="movie-scene movie-' + scene.slug + '"><div class="movie-starfield"></div><div class="movie-horizon"></div><div class="movie-core"><span>' + aura.symbol + '</span></div><div class="movie-ring movie-ring-a"></div><div class="movie-ring movie-ring-b"></div><div class="movie-fragments"></div><div class="movie-volumetric"></div><div class="movie-impact"></div></div>';
    eyebrow.textContent = scene.eyebrow;
    title.className = "movie-title";
    title.textContent = "";
    title.style.color = aura.color;
    subtitle.className = "movie-subtitle";
    subtitle.textContent = "";
    button.textContent = "SKIP CUTSCENE ↗";
    content.classList.remove("deity-reveal");
    cutscene.classList.remove("deity-running","deity-impact","galactic-running","galactic-break");
    cutscene.classList.add("movie-running");
    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    const reveal = (index) => {
      title.textContent = scene.lines[index];
      subtitle.textContent = scene.subtitles[index];
      title.className = index === 3 ? "movie-title movie-title-final" : "movie-title";
      content.classList.remove("movie-reveal");
      void content.offsetWidth;
      content.classList.add("movie-reveal");
      playDeityTone(scene.notes[index], index === 3 ? 2.4 : 1.35, index === 3 ? "triangle" : "sine", index === 3 ? 0.075 : 0.045);
      if (index === 3) {
        cutscene.classList.add("movie-finale");
        later(900, () => cutscene.classList.remove("movie-finale"));
        eyebrow.textContent = "AURABREAK ORIGINAL • " + aura.rarity;
      }
    };
    // A short, four-act mini-movie: establishing shot, escalation, reveal, hero frame.
    reveal(0);
    later(1900, () => reveal(1));
    later(3900, () => reveal(2));
    later(6100, () => reveal(3));
    later(8500, () => {
      cutscene.classList.remove("movie-running");
      button.textContent = "CLAIM DISCOVERY ↗";
    });
  }
  function startFallenGodCutscene() {
    const cutscene = $("cutscene"), art = $("cutsceneArt");
    const content = cutscene.querySelector(".cutscene-content");
    const eyebrow = $("cutsceneEyebrow"), title = $("cutsceneTitle"), subtitle = $("cutsceneSubtitle"), button = $("closeCutscene");
    stopDeityCutscene();
    cutscene.dataset.style = "fallen-god";
    cutscene.dataset.aura = "THE FALLEN GOD";
    cutscene.style.setProperty("--aura-color", "#f4e8ff");
    cutscene.style.setProperty("--movie-color", "#d8b6ff");
    art.innerHTML = '<div class="fallen-god-universe"></div><div class="fallen-god-eclipse"></div><div class="fallen-god-halo halo-a"></div><div class="fallen-god-halo halo-b"></div><div class="fallen-god-cracks"></div><div class="fallen-god-silhouette"><span>✦</span></div><div class="fallen-god-whiteout"></div>';
    eyebrow.textContent = "ADMIN OVERRIDE ACCEPTED • REALITY CONTROL TRANSFERRED";
    title.textContent = "";
    title.className = "fallen-god-line";
    subtitle.textContent = "";
    button.textContent = "SKIP THE REVELATION ↗";
    cutscene.classList.remove("deity-running","deity-impact","galactic-running","galactic-break","movie-running","movie-finale");
    cutscene.classList.add("fallen-god-running");
    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    const line = (a,b,cls="fallen-god-line") => {
      title.textContent = a; title.className = cls; subtitle.textContent = b;
      content.classList.remove("deity-reveal"); void content.offsetWidth; content.classList.add("deity-reveal");
    };
    line("ADMIN ACCESS DETECTED", "THE GAME HAS STOPPED PRETENDING.");
    playDeityTone(55, 3.2, "sawtooth", .11);
    later(2300, () => { line("WHO GAVE YOU PERMISSION?", "A VOICE FROM OUTSIDE THE WORLD."); playDeityTone(82.4, 2.4, "triangle", .08); });
    later(4900, () => { line("I MADE THE RULES.", "THE ODDS. THE ROLLS. THE REVEALS."); playDeityTone(110, 2.8, "sawtooth", .07); });
    later(7600, () => { cutscene.classList.add("fallen-god-awakened"); line("I LET YOU FIND THEM.", "EVERY GOD THINKS IT IS THE STRONGEST."); playDeityTone(164.81, 2.6, "triangle", .09); });
    later(10400, () => { line("BUT YOU KNOW BETTER.", "THE PLAYER STANDS SECOND ONLY TO ME."); playDeityTone(220, 2.8, "sine", .1); });
    later(13300, () => { cutscene.classList.add("fallen-god-impact"); line("THE FALLEN GOD", "THE STRONGEST. THE WATCHER. THE GAME ITSELF.", "fallen-god-final"); playDeityTone(41.2, 4.2, "sawtooth", .13); });
    later(16800, () => { eyebrow.textContent = "SECRET AURA • ADMIN-ONLY"; line("YOU WERE NEVER OUTSIDE MY WORLD.", "YOU WERE PLAYING INSIDE MY HAND.", "fallen-god-final"); });
    later(20500, () => { cutscene.classList.remove("fallen-god-running"); button.textContent = "CLAIM THE FALLEN GOD ↗"; });
  }
  function startTruthReveal() {
    const cutscene = $("cutscene"), art = $("cutsceneArt"), content = cutscene.querySelector(".cutscene-content");
    stopDeityCutscene();
    cutscene.dataset.style = "fallen-god";
    cutscene.dataset.aura = "DIVINE TRUTH";
    cutscene.style.setProperty("--aura-color", "#d7c5ff");
    cutscene.style.setProperty("--movie-color", "#d7c5ff");
    art.innerHTML = '<div class="fallen-god-universe"></div><div class="fallen-god-eclipse"></div><div class="fallen-god-halo halo-a"></div><div class="fallen-god-halo halo-b"></div><div class="fallen-god-cracks"></div><div class="fallen-god-silhouette"><span>✦</span></div><div class="fallen-god-whiteout"></div>';
    cutscene.classList.remove("deity-running","deity-impact","galactic-running","galactic-break","movie-running","movie-finale","fallen-god-impact","fallen-god-awakened");
    cutscene.classList.add("fallen-god-running");
    $("closeCutscene").textContent = "SKIP REVELATION ↗";
    const title = $("cutsceneTitle"), subtitle = $("cutsceneSubtitle"), eyebrow = $("cutsceneEyebrow");
    const line = (a,b,cls="fallen-god-line",color="#f4e8ff") => {
      title.textContent=a; title.className=cls; title.style.color=color; subtitle.textContent=b;
      content.classList.remove("deity-reveal"); void content.offsetWidth; content.classList.add("deity-reveal");
    };
    const later=(ms,fn)=>cutsceneTimers.push(setTimeout(fn,ms));
    line("THE TRUTH", "FIVE GODS. FIVE CLAIMS OF SUPREMACY.");
    playDeityTone(110, 2.0, "sine", .06);
    later(2100,()=>{ eyebrow.textContent="RANK 7 • PURE DEITY"; line("PURE DEITY", "THE WEAKEST OF THE FIVE."); });
    later(3900,()=>{ line("...IMPOSSIBLE.", "PURE DEITY: I AM THE HIGHEST. I CANNOT BE THE LOWEST.", "fallen-god-line", "#fff4d6"); playDeityTone(330, 1.2, "triangle", .06); });
    later(5900,()=>{ eyebrow.textContent="RANK 6 • CHAOTIC END"; line("CHAOTIC END", "CHAOS DOES NOT ANSWER TO ANYTHING."); });
    later(7700,()=>{ line("THEN LET EVERYTHING END!", "CHAOTIC END REFUSES THE RANKING.", "fallen-god-line", "#ff435f"); cutscene.classList.add("fallen-god-impact"); playDeityTone(55, 1.8, "sawtooth", .09); });
    later(9700,()=>{ cutscene.classList.remove("fallen-god-impact"); eyebrow.textContent="RANK 5 • GLITCHED SCREAMS"; line("GLITCHED SCREAMS", "THE RULES SAY I AM THE TOP."); });
    later(11500,()=>{ line("ERROR. ERROR. ERROR.", "GLITCHED SCREAMS TRIES TO CORRUPT THE REVEAL.", "fallen-god-line", "#f44dff"); cutscene.classList.add("galactic-break"); playDeityTone(73.42, 1.5, "sawtooth", .08); });
    later(13300,()=>{ cutscene.classList.remove("galactic-break"); eyebrow.textContent="RANK 4 • LORE CREATIONIST"; line("LORE CREATIONIST", "I WROTE THE HISTORY OF THIS WORLD."); });
    later(15100,()=>{ line("THEN WHO WROTE MY DEFEAT?", "LORE CREATIONIST FINDS A PAGE IT NEVER CREATED.", "fallen-god-line", "#65caff"); playDeityTone(261.63, 1.5, "triangle", .07); });
    later(16900,()=>{ eyebrow.textContent="RANK 3 • THE MAKER"; line("THE MAKER", "I CREATED THIS WORLD. NOTHING STANDS ABOVE ME."); });
    later(18800,()=>{ line("NO. THIS IS A LIE.", "THE MAKER'S OWN CREATION DISOBEYS ITS CERTAINTY.", "fallen-god-line", "#ffcf76"); playDeityTone(196, 2.0, "sawtooth", .08); });
    later(20900,()=>{ eyebrow.textContent="RANK 2 • THE PLAYER"; line("THE PLAYER", "YOU COULD ONLY UNCOVER THE TRUTH BECAUSE YOU STAND ABOVE THEM.", "fallen-god-final"); });
    later(23300,()=>{ eyebrow.textContent="RANK 1 • THE FALLEN GOD"; cutscene.classList.add("fallen-god-impact"); line("ENOUGH.", "THE FALLEN GOD HAS BEEN LISTENING THE ENTIRE TIME.", "fallen-god-final"); playDeityTone(41.2, 3.0, "sawtooth", .13); });
    later(25800,()=>{ cutscene.classList.remove("fallen-god-impact"); cutscene.classList.add("fallen-god-awakened"); line("YOU MAY KNOW THE RANKS.", "BUT I STILL CONTROL THE WORLD WHERE YOU LEARNED THEM.", "fallen-god-final"); eyebrow.textContent="THE FALLEN GOD • CONTROLLER OF AURABREAK"; });
    later(28900,()=>{ line("THE TRUTH HAS BEEN TOLD.", "THE GODS DO NOT ACCEPT IT. NOT YET.", "fallen-god-final"); });
    later(32000,()=>{ cutscene.classList.remove("fallen-god-running","fallen-god-awakened","fallen-god-impact"); $("closeCutscene").textContent="CLOSE REVELATION ↗"; });
  }
  function startDeveloperCutscene() {
    const cutscene = $("cutscene"), art = $("cutsceneArt");
    const content = cutscene.querySelector(".cutscene-content");
    const eyebrow = $("cutsceneEyebrow"), title = $("cutsceneTitle"), subtitle = $("cutsceneSubtitle"), button = $("closeCutscene");
    stopDeityCutscene();
    cutscene.dataset.style = "developer";
    cutscene.dataset.aura = "DEVELOPER";
    cutscene.style.setProperty("--aura-color", "#ffffff");
    cutscene.style.setProperty("--movie-color", "#ffffff");
    art.innerHTML = '<div class="developer-void"></div><div class="developer-grid"></div><div class="developer-rings developer-ring-a"></div><div class="developer-rings developer-ring-b"></div><div class="developer-cursor">↖</div><div class="developer-avatar"><span>✧</span></div><div class="developer-code">REALITY: EDITABLE<br>AUTHORITY: ABSOLUTE<br>FALLEN GOD: OVERRIDDEN</div><div class="developer-flash"></div>';
    eyebrow.textContent = "ROOT ACCESS • OUTSIDE THE SIMULATION";
    title.textContent = "";
    title.className = "developer-line";
    subtitle.textContent = "";
    button.textContent = "SKIP DEVELOPER REVEAL ↗";
    cutscene.classList.remove("deity-running","deity-impact","galactic-running","galactic-break","movie-running","movie-finale","fallen-god-running","fallen-god-awakened","fallen-god-impact","developer-running","developer-overwrite");
    cutscene.classList.add("developer-running");
    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    const line = (a,b,cls="developer-line") => {
      title.textContent = a; title.className = cls; subtitle.textContent = b;
      content.classList.remove("deity-reveal"); void content.offsetWidth; content.classList.add("deity-reveal");
    };
    line("UNKNOWN AUTHORITY", "A PRESENCE HAS ENTERED FROM OUTSIDE THE GAME.");
    playDeityTone(110, 2.5, "sine", .07);
    later(2200, () => { line("THE FALLEN GOD IS NOT THE TOP.", "ITS CONTROL HAS A SOURCE."); playDeityTone(82.4, 2.5, "triangle", .08); });
    later(4800, () => { cutscene.classList.add("developer-overwrite"); line("ROOT ACCESS GRANTED.", "EVERY RULE. EVERY ROLL. EVERY GOD."); playDeityTone(55, 3, "sawtooth", .07); });
    later(7600, () => { line("THE FALLEN GOD", "CONTROL SIGNAL LOST."); eyebrow.textContent = "SYSTEM MESSAGE • ADMINISTRATOR OVERRIDE"; });
    later(9800, () => { cutscene.classList.add("developer-impact"); line("DEVELOPER", "THE TRUE STRONGEST BEING IN AURABREAK.", "developer-final"); playDeityTone(27.5, 4.5, "sawtooth", .12); });
    later(13000, () => { eyebrow.textContent = "RANK 0 • ABOVE THE FALLEN GOD"; line("I WROTE THE RULES.", "THE FALLEN GOD CONTROLS THE GAME. I CONTROL WHAT THE GAME IS.", "developer-final"); });
    later(16400, () => { line("YOU FOUND THE SECRET.", "ADMIN-ONLY AURA • NEVER AVAILABLE FROM NORMAL ROLLS", "developer-final"); });
    later(19500, () => { cutscene.classList.remove("developer-running"); button.textContent = "CLAIM DEVELOPER AURA ↗"; });
  }
  function showCutscene(aura) {
    const cutscene = $("cutscene");
    cutscene.dataset.style = aura.style || "cosmic";
    cutscene.dataset.aura = aura.name;
    cutscene.style.setProperty("--aura-color", aura.color);
    $("cutsceneEyebrow").textContent = aura.secret ? "UNCLASSIFIED REALITY FAILURE" : aura.odds >= 1000000 ? "ANOMALY EVENT DETECTED" : "A NEW FORCE HAS AWAKENED";
    $("cutsceneTitle").textContent = aura.name;
    $("cutsceneTitle").style.color = aura.color;
    $("cutsceneSubtitle").textContent = aura.secret ? "THE RULES NO LONGER APPLY." : aura.description.toUpperCase();
    $("cutsceneArt").textContent = "";
    cutscene.classList.remove("deity-running", "deity-impact", "galactic-running", "galactic-break", "movie-running", "movie-finale", "fallen-god-running", "fallen-god-awakened", "fallen-god-impact", "developer-running", "developer-overwrite", "developer-impact");
    if (aura.name === "PURE DEITY") startPureDeityCutscene();
    else if (aura.name === "PURE DEITY:GALACTIC") startGalacticCutscene();
    else if (aura.name === "THE FALLEN GOD") startFallenGodCutscene();
    else if (aura.name === "DEVELOPER") startDeveloperCutscene();
    else startAuraMovie(aura);
    cutscene.classList.remove("hidden");
    cutscene.setAttribute("aria-hidden", "false");
  }
  function closeCutscene() {
    stopDeityCutscene();
    const cutscene = $("cutscene");
    if (cutscene.dataset.style === "transcendence") activateTranscendenceMode();
    cutscene.classList.add("hidden");
    cutscene.classList.remove("deity-running", "deity-impact", "galactic-running", "galactic-break", "movie-running", "movie-finale", "fallen-god-running", "fallen-god-awakened", "fallen-god-impact", "developer-running", "developer-overwrite", "developer-impact");
    cutscene.setAttribute("aria-hidden", "true");
    $("closeCutscene").textContent = "CLAIM DISCOVERY ↗";
    if (pendingAura) {
      renderResult(pendingAura, !discovered.has(pendingAura.name));
      pendingAura = null;
    }
    if (transcendencePending && !transcendenceUnlocked) {
      transcendencePending = false;
      startTranscendenceCutscene();
      cutscene.classList.remove("hidden");
      cutscene.setAttribute("aria-hidden", "false");
    }
  }
  function activateTranscendenceMode() {
    transcendenceUnlocked = true;
    try { localStorage.setItem(TRANSCENDENCE_KEY, "yes"); } catch {}
    document.body.classList.add("transcendence-mode");
    document.title = "AURABREAK II: TRANSCENDENCE";
    const brand = document.querySelector(".brand");
    if (brand) brand.innerHTML = '<span class="brand-mark">Ⅱ</span><span>AURA<span class="brand-light">BREAK</span><small>TRANSCENDENCE</small></span>';
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) heroTitle.innerHTML = 'BEYOND THE<br><span>DIVINE.</span>';
    const heroCopy = document.querySelector(".hero-copy");
    if (heroCopy) heroCopy.innerHTML = 'The five gods were only the beginning.<br>Reality has entered its second phase.';
    const eyebrow = document.querySelector(".hero .eyebrow");
    if (eyebrow) eyebrow.textContent = "AURABREAK II • TRANSCENDENCE UNLOCKED";
    const status = document.querySelector(".top-status");
    if (status) status.innerHTML = '<span class="status-dot"></span> REALITY TRANSCENDED <span class="version">AURABREAK II</span>';
    const stage = $("stageLabel");
    if (stage) stage.textContent = "AURABREAK II // TRANSCENDENCE";
    showToast("AURABREAK II UNLOCKED — REALITY HAS TRANSCENDED.");
  }
  function startTranscendenceCutscene() {
    const cutscene = $("cutscene"), art = $("cutsceneArt"), content = cutscene.querySelector(".cutscene-content");
    stopDeityCutscene();
    cutscene.dataset.style = "transcendence";
    cutscene.dataset.aura = "AURABREAK II";
    cutscene.style.setProperty("--aura-color", "#a9fff7");
    cutscene.style.setProperty("--movie-color", "#d9ffff");
    art.innerHTML = '<div class="transcendence-space"></div><div class="transcendence-fracture"></div><div class="transcendence-rings trans-ring-one"></div><div class="transcendence-rings trans-ring-two"></div><div class="transcendence-god-silhouettes"><i>✧</i><i>⟁</i><i>⌁</i><i>✥</i><i>✹</i></div><div class="transcendence-player">Ⅱ</div><div class="transcendence-flash"></div>';
    cutscene.classList.remove("deity-running","deity-impact","galactic-running","galactic-break","movie-running","movie-finale","fallen-god-running","fallen-god-awakened","fallen-god-impact","developer-running","developer-overwrite","developer-impact","transcendence-running","transcendence-break");
    cutscene.classList.add("transcendence-running");
    $("cutsceneEyebrow").textContent = "FIVE GODS DISCOVERED • DIVINE LIMIT BROKEN";
    $("closeCutscene").textContent = "SKIP TO TRANSCENDENCE ↗";
    const title = $("cutsceneTitle"), subtitle = $("cutsceneSubtitle"), eyebrow = $("cutsceneEyebrow");
    const line = (a,b,cls="transcendence-line") => {
      title.textContent = a; title.className = cls; title.style.color = "#eaffff"; subtitle.textContent = b;
      content.classList.remove("deity-reveal"); void content.offsetWidth; content.classList.add("deity-reveal");
    };
    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    line("ALL FIVE GODS.", "THEIR POWER WAS NEVER THE END.");
    playDeityTone(110, 2.8, "sine", .08);
    later(2600, () => { line("THEIR BELIEFS COLLAPSE.", "EVERY GOD CLAIMED SUPREMACY. NONE SAW BEYOND IT."); playDeityTone(73.4, 3, "triangle", .09); });
    later(5500, () => { cutscene.classList.add("transcendence-break"); line("THE WORLD WAS A THRESHOLD.", "THE COLLECTION WAS A KEY."); playDeityTone(55, 3.4, "sawtooth", .08); });
    later(8500, () => { line("AURABREAK II", "TRANSCENDENCE PROTOCOL ACCEPTED.", "transcendence-final"); playDeityTone(164.8, 3.5, "sine", .1); });
    later(11800, () => { line("THE NEXT REALITY AWAITS.", "THE FALLEN GOD STILL WATCHES. SOMETHING ELSE IS AWAKE.", "transcendence-final"); });
    later(15000, () => {
      activateTranscendenceMode();
      cutscene.classList.remove("transcendence-running","transcendence-break");
      $("closeCutscene").textContent = "ENTER AURABREAK II ↗";
      $("cutsceneEyebrow").textContent = "PHASE II • TRANSCENDENCE";
      line("WELCOME BEYOND.", "YOU HAVE OUTGROWN THE FIRST WORLD.", "transcendence-final");
    });
  }
  if (transcendenceUnlocked) activateTranscendenceMode();
  function roll() {
    if (rolling) return;
    rolling = true;
    $("rollButton").disabled = true;
    document.body.classList.add("rolling");
    $("stageLabel").textContent = "REALITY IS REARRANGING...";
    let aura = chooseAura();
    runRollCount++;
    if (runRollCount > 5000) { runRollCount = 1; pureDeityEncounters = 0; }
    if (aura.name === "PURE DEITY") {
      pureDeityEncounters++;
      if (pureDeityEncounters === 2) aura = AURAS.find(a => a.name === "PURE DEITY:GALACTIC");
    }
    setTimeout(() => {
      rolling = false;
      $("rollButton").disabled = false;
      document.body.classList.remove("rolling");
      const isNew = !discovered.has(aura.name);
      discovered.add(aura.name);
      if (!transcendenceUnlocked && ORIGINAL_GODS.every(name => discovered.has(name))) transcendencePending = true;
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

  // Admin tools: Shift+A toggles the panel. These are client-side prototype controls.
  const adminPanel = $("adminPanel");
  const adminAuraSelect = $("adminAuraSelect");
  const adminUnlockAll = $("adminUnlockAll");
  const adminTellTruth = $("adminTellTruth");
  const adminLuck = $("adminLuck");
  const adminLuckValue = $("adminLuckValue");
  const customAuraName = $("customAuraName");
  const customAuraOdds = $("customAuraOdds");
  const customAuraRarity = $("customAuraRarity");
  const customAuraColor = $("customAuraColor");
  function refreshAdminAuraOptions() {
    const previous = adminAuraSelect.value;
    adminAuraSelect.innerHTML = "";
    AURAS.forEach(aura => {
      const option = document.createElement("option");
      option.value = aura.name;
      option.textContent = aura.name + " — " + formatOdds(aura.odds);
      adminAuraSelect.append(option);
    });
    if (AURAS.some(aura => aura.name === previous)) adminAuraSelect.value = previous;
  }
  function toggleAdmin() {
    adminPanel.classList.toggle("hidden");
    adminPanel.setAttribute("aria-hidden", adminPanel.classList.contains("hidden") ? "true" : "false");
    if (!adminPanel.classList.contains("hidden")) refreshAdminAuraOptions();
  }
  document.addEventListener("keydown", event => {
    if (event.shiftKey && event.code === "KeyA" && !event.repeat) {
      event.preventDefault();
      toggleAdmin();
    }
  });
  $("adminClose").addEventListener("click", toggleAdmin);
  adminUnlockAll.addEventListener("click", () => {
    AURAS.filter(aura => !aura.adminOnly && !aura.god).forEach(aura => discovered.add(aura.name));
    saveDiscoveries(); renderCollection();
    showToast("NON-GOD AURAS UNLOCKED — ALL FIVE GODS REMAIN TO BE DISCOVERED.");
  });
  adminTellTruth.addEventListener("click", () => {
    toggleAdmin();
    pendingAura = null;
    startTruthReveal();
    $("cutscene").classList.remove("hidden");
    $("cutscene").setAttribute("aria-hidden", "false");
  });
  $("adminForceAura").addEventListener("click", () => {
    const aura = AURAS.find(item => item.name === adminAuraSelect.value);
    if (!aura) return;
    forcedAura = aura;
    $("adminForceAura").textContent = "NEXT ROLL: " + aura.name;
    showToast("RIGGED: your next manual roll will be " + aura.name);
  });
  adminLuck.addEventListener("input", () => {
    const raw = String(adminLuck.value || "1").trim();
    const parsed = Number(raw);
    luckMultiplier = Math.max(1, Number.isFinite(parsed) ? parsed : Number.MAX_VALUE);
    adminLuckValue.textContent = "×" + (Number.isFinite(parsed) ? parsed.toLocaleString("en-US") : "MAX");
    $("luckValue").textContent = adminLuckValue.textContent.slice(1);
  });
  $("adminAddAura").addEventListener("click", () => {
    const name = customAuraName.value.trim().toUpperCase();
    const oddsText = String(customAuraOdds.value || "").trim();
    let odds;
    try { odds = BigInt(oddsText); } catch { odds = 0n; }
    const rarity = customAuraRarity.value.trim().toUpperCase() || "CUSTOM";
    const color = customAuraColor.value || "#b8a9ff";
    if (!name) return showToast("Enter an aura name first.");
    if (AURAS.some(aura => aura.name === name)) return showToast("That aura already exists.");
    if (odds < 1n) return showToast("Odds must be a whole number of 1 or higher.");
    const tier = odds >= 1000000n ? "secret" : odds >= 100000n ? "cosmic" : odds >= 10000n ? "mythic" : odds >= 1000n ? "legendary" : odds >= 100n ? "rare" : odds >= 10n ? "uncommon" : "common";
    const aura = {name, odds, rarity, tier, color, symbol:"✧", description:"A custom aura added from the AURABREAK admin panel.", style:"cosmic"};
    AURAS.push(aura);
    refreshAdminAuraOptions();
    adminAuraSelect.value = name;
    showToast("Added custom aura: " + name);
  });

  // A local browser identifier helps identify this installation, but is NOT secure authentication.
  const DEVICE_KEY = "aurabreak-device-id-v1";
  let deviceId = "";
  try {
    deviceId = localStorage.getItem(DEVICE_KEY) || "";
    if (!deviceId) {
      deviceId = (crypto.randomUUID ? crypto.randomUUID() : "AB-" + Math.random().toString(36).slice(2) + Date.now().toString(36)).toUpperCase();
      localStorage.setItem(DEVICE_KEY, deviceId);
    }
  } catch { deviceId = "UNAVAILABLE"; }
  const deviceLabel = document.createElement("small");
  deviceLabel.className = "admin-device-id";
  deviceLabel.textContent = "THIS BROWSER DEVICE ID: " + deviceId;
  const adminNote = document.querySelector(".admin-note");
  if (adminNote) adminNote.after(deviceLabel);

  renderCollection();
})();