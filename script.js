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
    {name:"THUNDERHEART", odds:22000, rarity:"MYTHIC", tier:"mythic", color:"#78d9ff", symbol:"ϟ", description:"A storm learned to beat like a living heart.", style:"thunderheart"},
    {name:"FROSTBITE", odds:65000, rarity:"MYTHIC", tier:"mythic", color:"#b7f4ff", symbol:"❄", description:"A frozen star exhales across the battlefield.", style:"frostbite"},
    {name:"TOXIC BLOOM", odds:180000, rarity:"COSMIC", tier:"cosmic", color:"#9dff62", symbol:"✿", description:"Beautiful life grows where reality has begun to rot.", style:"toxic-bloom"},
    {name:"PRISMATIC", odds:480000, rarity:"COSMIC", tier:"cosmic", color:"#ff9df2", symbol:"✧", description:"One light splits into every possible world.", style:"prismatic"},
    {name:"SOULFIRE", odds:1200000, rarity:"TRANSCENDENT", tier:"divine", color:"#ff8c58", symbol:"♨", description:"A blue-white flame burns brighter than memory.", style:"soulfire"},
    {name:"CHRONO BREAK", odds:4000000, rarity:"TRANSCENDENT", tier:"divine", color:"#ffc76a", symbol:"◷", description:"Every second you lost returns at once.", style:"chrono-break"},
    {name:"LEVIATHAN", odds:15000000, rarity:"DIVINE", tier:"divine", color:"#42e4df", symbol:"♆", description:"Something enormous turns beneath the sea of stars.", style:"leviathan"},
    {name:"DRAGON EMPEROR", odds:60000000, rarity:"DIVINE", tier:"divine", color:"#ff684f", symbol:"♜", description:"Ancient wings eclipse the sky; the world bows to flame.", style:"dragon-emperor"},
    {name:"AURORA VEIL", odds:240000000, rarity:"DIVINE", tier:"divine", color:"#91ffdb", symbol:"❋", description:"The heavens flow like silk across the night.", style:"aurora-veil"},
    {name:"SINGULARITY", odds:1000000000, rarity:"DIVINE", tier:"divine", color:"#bd8cff", symbol:"⦿", description:"All distance collapses into a single point.", style:"singularity"},
    {name:"CELESTIAL JUDGMENT", odds:5000000000, rarity:"DIVINE", tier:"divine", color:"#fff0b0", symbol:"⚡", description:"A beam from beyond the clouds selects its target.", style:"celestial-judgment"},
    {name:"PHANTOM REQUIEM", odds:25000000000, rarity:"DIVINE", tier:"divine", color:"#b3a5ff", symbol:"♬", description:"A silent choir drifts through the abandoned universe.", style:"phantom-requiem"},
    {name:"ECLIPSE SERAPH", odds:100000000000, rarity:"DIVINE", tier:"divine", color:"#f5d9ff", symbol:"♱", description:"A radiant being unfolds its shadowed wings.", style:"eclipse-seraph"},
    {name:"INFERNAL CROWN", odds:500000000000, rarity:"DIVINE", tier:"divine", color:"#ff3d4e", symbol:"♛", description:"The throne of the underworld ignites without a ruler.", style:"infernal-crown"},
    {name:"RIFTSTORM", odds:10n ** 13n, rarity:"BEYOND DIVINE", tier:"secret", color:"#59f1ff", symbol:"⟁", description:"A storm tears holes through the walls between worlds.", style:"riftstorm", secret:true},
    {name:"STAR EATER", odds:10n ** 16n, rarity:"BEYOND DIVINE", tier:"secret", color:"#ffb66e", symbol:"◉", description:"A hungry darkness swallows constellations whole.", style:"star-eater", secret:true},
    {name:"OMNIFLARE", odds:10n ** 19n, rarity:"BEYOND DIVINE", tier:"secret", color:"#fff7c7", symbol:"✹", description:"Every star ignites at once, then turns toward you.", style:"omniflare", secret:true},
    {name:"ETERNAL ZERO", odds:10n ** 22n, rarity:"BEYOND DIVINE", tier:"secret", color:"#d4e5ff", symbol:"∅", description:"The silence before existence becomes an endless ocean.", style:"eternal-zero", secret:true},
    {name:"DREAM//ERROR", odds:10n ** 25n, rarity:"REALITY FAILURE", tier:"secret", color:"#ff83dc", symbol:"⌁", description:"A dream leaks into the game and refuses to follow its rules.", style:"dream-error", secret:true},
    {name:"WORLD ENGINE", odds:10n ** 28n, rarity:"REALITY FAILURE", tier:"secret", color:"#ffcf76", symbol:"⚙", description:"The machinery behind creation finally becomes visible.", style:"world-engine", secret:true},
    {name:"GODSLEEP", odds:10n ** 31n, rarity:"REALITY FAILURE", tier:"secret", color:"#9c8bff", symbol:"☾", description:"A sleeping god stirs; entire galaxies tremble in its dream.", style:"godsleep", secret:true},
    {name:"FINAL HORIZON", odds:10n ** 34n, rarity:"REALITY FAILURE", tier:"secret", color:"#ff9fba", symbol:"➤", description:"The last edge of the universe opens like a door.", style:"final-horizon", secret:true},
    {name:"UNIVERSE BREAKER", odds:10n ** 38n, rarity:"WORLD END", tier:"secret", color:"#ff4d74", symbol:"✹", description:"A force too large for a universe to contain finally wakes.", style:"universe-breaker", secret:true},
    {name:"APEX: INFINITE", odds:10n ** 41n, rarity:"PRE-GOD ASCENDANT", tier:"secret", color:"#ffffff", symbol:"∞", description:"The limit was an illusion. Something has stepped beyond it.", style:"apex-infinite", secret:true},
    {name:"PURE DEITY", odds:1000000000000000000000000000000000000n, rarity:"GOD • RANK 7", tier:"secret", color:"#fff4d6", symbol:"✧", description:"The weakest of the five original gods. It still believes it is the strongest.", style:"pure-deity", secret:true, god:true},
    {name:"CHAOTIC END", odds:10n ** 42n, rarity:"GOD • RANK 6", tier:"secret", color:"#ff435f", symbol:"⟁", description:"The god of chaos. It believes no power can stand above it.", style:"chaotic-end", secret:true, god:true},
    {name:"GLITCHED SCREAMS", odds:10n ** 48n, rarity:"GOD • RANK 5", tier:"secret", color:"#f44dff", symbol:"⌁", description:"A god whose existence corrupts the rules of reality.", style:"glitched-screams", secret:true, god:true},
    {name:"LORE CREATIONIST", odds:10n ** 54n, rarity:"GOD • RANK 4", tier:"secret", color:"#65caff", symbol:"✥", description:"The god who shaped the stories and history of the universe.", style:"lore-creationist", secret:true, god:true},
    {name:"THE MAKER", odds:10n ** 60n, rarity:"GOD • RANK 3", tier:"secret", color:"#ffcf76", symbol:"✹", description:"Creator of the world. It believes nothing exists above it.", style:"the-maker", secret:true, god:true},
    {name:"THE FALLEN GOD", odds:10n ** 72n, rarity:"THE TRUE SOVEREIGN", tier:"secret", color:"#f4e8ff", symbol:"✦", description:"The one who knows the truth and controls AURABREAK itself.", style:"fallen-god", secret:true, adminOnly:true, god:true},
    {name:"DEVELOPER", odds:10n ** 100n, rarity:"RANK 0 • THE REAL CREATOR", tier:"secret", color:"#ffffff", symbol:"⟡", description:"The true strongest. The author beyond the Fallen God, who can rewrite the rules of AURABREAK.", style:"developer", secret:true, adminOnly:true, god:true},
    {name:"PURE DEITY:GALACTIC", odds:2n * (10n ** 68n), rarity:"GALACTIC EVOLUTION", tier:"secret", color:"#9be7ff", symbol:"✦", description:"Wait... I remember you. The deity has shattered its own limits.", style:"galactic", secret:true},
    {name:"UNSIN­FUL".replace("­",""), odds:1234567899876543211234567890n, rarity:"UNSINFUL", tier:"secret", color:"#ff4df0", symbol:"⟁", description:"A shapeless anomaly beyond every known law.", style:"unsinful", secret:true},
    {name:"SHATTERCORE", odds:10n ** 80n, rarity:"ORB FRACTURE", tier:"secret", color:"#ff684f", symbol:"◇", description:"The orb was never meant to survive what sleeps inside. Its evolution is hidden in the silence between strikes. The broken core remembers a rhythm no living thing should know.", style:"shattercore", secret:true},
    {name:"SHATTERCORE: REBORN", odds:10n ** 72n, rarity:"FRACTURE EVOLUTION", tier:"secret", color:"#fff0b3", symbol:"✧", description:"Not a second encounter. Not a lucky roll. Seven deliberate strikes taught the broken core how to become something new.", style:"shattercore", secret:true, evolutionOnly:true},
    {name:"THE ENDING", odds:10n ** 120n, rarity:"IMPOSSIBLE", tier:"secret", color:"#ff294f", symbol:"⟡", description:"The final error. Reality has reached the last line of its code.", style:"the-ending", secret:true, adminOnly:true},
    {name:"NULL//ABSOLUTE", odds:10n ** 150n, rarity:"BEYOND IMPOSSIBLE", tier:"secret", color:"#ff1b78", symbol:"⦿", description:"The universe is not ending. It is being unrendered.", style:"null-absolute", secret:true, adminOnly:true},
    {name:"THE VIEWER", odds:10n ** 200n, rarity:"FOURTH-WALL FAILURE", tier:"secret", color:"#b7fffe", symbol:"◉", description:"You were watching the game. Now the game is addressing you.", style:"the-viewer", secret:true, adminOnly:true},
  ];
  // Remove the temporary test aura if it ever existed in an older build.
  for (let i = AURAS.length - 1; i >= 0; i--) if (AURAS[i].name === "HI") AURAS.splice(i, 1);
  const POTION_STORAGE_KEY = "aurabreak-potions-v1";
  const POTIONS = [
    {name:"Luck Potion", desc:"10× luck for your next roll.", type:"luck", value:10, color:"#8effb4", symbol:"✦"},
    {name:"God Potion", desc:"Guarantees one of the rollable gods.", type:"god", value:1, color:"#ffe59a", symbol:"♛"},
    {name:"Super Luck Potion", desc:"25× luck for one roll.", type:"luck", value:25, color:"#9df5ff", symbol:"✧"},
    {name:"Ultra Luck Potion", desc:"100× luck for one roll.", type:"luck", value:100, color:"#b6a0ff", symbol:"✦"},
    {name:"Divine Luck Potion", desc:"1,000× luck for one roll.", type:"luck", value:1000, color:"#fff1b8", symbol:"☼"},
    {name:"Celestial Luck Potion", desc:"10,000× luck for one roll.", type:"luck", value:10000, color:"#a8e8ff", symbol:"✧"},
    {name:"Cosmic Luck Potion", desc:"1,000,000× luck for one roll.", type:"luck", value:1e6, color:"#d8a6ff", symbol:"☄"},
    {name:"Astral Luck Potion", desc:"1,000,000,000× luck for one roll.", type:"luck", value:1e9, color:"#8bdcff", symbol:"✶"},
    {name:"Eternal Luck Potion", desc:"1e12× luck for one roll.", type:"luck", value:1e12, color:"#fff5db", symbol:"∞"},
    {name:"Infinite Luck Potion", desc:"Uses the highest practical luck setting for one roll.", type:"luck", value:1e100, color:"#ffffff", symbol:"∞"},
    {name:"Fortune Elixir", desc:"50× luck for one roll.", type:"luck", value:50, color:"#a4ff9d", symbol:"♧"},
    {name:"Starfall Brew", desc:"25,000× luck for one roll.", type:"luck", value:25000, color:"#9fe4ff", symbol:"☄"},
    {name:"Nebula Nectar", desc:"100,000× luck for one roll.", type:"luck", value:1e5, color:"#c9a2ff", symbol:"✺"},
    {name:"Aurora Tonic", desc:"500,000× luck for one roll.", type:"luck", value:5e5, color:"#9affdb", symbol:"❋"},
    {name:"Solar Serum", desc:"5,000,000× luck for one roll.", type:"luck", value:5e6, color:"#ffd17c", symbol:"☼"},
    {name:"Lunar Elixir", desc:"5e7× luck for one roll.", type:"luck", value:5e7, color:"#b9d5ff", symbol:"☾"},
    {name:"Void Vial", desc:"1e10× luck for one roll.", type:"luck", value:1e10, color:"#a89bff", symbol:"◉"},
    {name:"Rift Tonic", desc:"1e13× luck for one roll.", type:"luck", value:1e13, color:"#74f0ff", symbol:"⟁"},
    {name:"Reality Serum", desc:"1e16× luck for one roll.", type:"luck", value:1e16, color:"#ff9ae7", symbol:"⌁"},
    {name:"Chaos Potion", desc:"Roll 5 times internally and keep the rarest result.", type:"bestof", value:5, color:"#ff6c9f", symbol:"⌁"},
    {name:"Chaos Elixir", desc:"Roll 10 times internally and keep the rarest result.", type:"bestof", value:10, color:"#ff4f83", symbol:"⌁"},
    {name:"Fate Rewriter", desc:"Roll 25 times internally and keep the rarest result.", type:"bestof", value:25, color:"#ffb0d5", symbol:"⟳"},
    {name:"Destiny Draught", desc:"Roll 50 times internally and keep the rarest result.", type:"bestof", value:50, color:"#ffc5ed", symbol:"⟳"},
    {name:"Mythic Potion", desc:"Guarantees a rollable aura with odds of at least 1 in 1,000,000.", type:"guarantee", value:1e6, color:"#ff93b8", symbol:"✹"},
    {name:"Divinity Potion", desc:"Guarantees a rollable aura with odds of at least 1 in 100,000,000.", type:"guarantee", value:1e8, color:"#fff0a8", symbol:"✹"},
    {name:"Cosmic Potion", desc:"Guarantees a rollable aura with odds of at least 1 in 1 trillion.", type:"guarantee", value:1e12, color:"#a6a4ff", symbol:"✧"},
    {name:"Transcendence Potion", desc:"Guarantees a rollable aura with odds of at least 1 in 1e18.", type:"guarantee", value:1e18, color:"#d4c3ff", symbol:"∞"},
    {name:"Secret Seeker", desc:"Guarantees a rollable aura with odds of at least 1 in 1e24.", type:"guarantee", value:1e24, color:"#ff8ae1", symbol:"◇"},
    {name:"Reality Breaker", desc:"Guarantees a rollable aura with odds of at least 1 in 1e30.", type:"guarantee", value:1e30, color:"#ff647b", symbol:"⟁"},
    {name:"Apex Elixir", desc:"Guarantees a rollable aura with odds of at least 1 in 1e38.", type:"guarantee", value:1e38, color:"#ffffff", symbol:"∞"},
    {name:"Godslayer's Bane", desc:"Guarantees a random rollable god.", type:"god", value:1, color:"#ff7b7b", symbol:"♜"},
    {name:"Pantheon Potion", desc:"Guarantees a random rollable god.", type:"god", value:1, color:"#ffd778", symbol:"♛"},
    {name:"Deity's Blessing", desc:"Guarantees a random rollable god.", type:"god", value:1, color:"#fff1bf", symbol:"✧"},
    {name:"Creator's Elixir", desc:"Guarantees a random rollable god.", type:"god", value:1, color:"#ffcf76", symbol:"✹"},
    {name:"Heaven's Draught", desc:"Guarantees a random rollable god.", type:"god", value:1, color:"#c6f2ff", symbol:"☼"},
    {name:"Fallen Star Potion", desc:"100,000× luck for one roll.", type:"luck", value:1e5, color:"#b4a4ff", symbol:"✦"},
    {name:"Thunderbrew", desc:"750,000× luck for one roll.", type:"luck", value:7.5e5, color:"#78d9ff", symbol:"ϟ"},
    {name:"Frostfire Flask", desc:"7,500,000× luck for one roll.", type:"luck", value:7.5e6, color:"#b7f4ff", symbol:"❄"},
    {name:"Prismatic Potion", desc:"5e9× luck for one roll.", type:"luck", value:5e9, color:"#ff9df2", symbol:"✧"},
    {name:"Soulfire Serum", desc:"5e11× luck for one roll.", type:"luck", value:5e11, color:"#ff8c58", symbol:"♨"},
    {name:"Chrono Elixir", desc:"Roll 3 times internally and keep the rarest result.", type:"bestof", value:3, color:"#ffc76a", symbol:"◷"},
    {name:"Leviathan's Brew", desc:"Roll 7 times internally and keep the rarest result.", type:"bestof", value:7, color:"#42e4df", symbol:"♆"},
    {name:"Dragon Emperor's Draught", desc:"Roll 12 times internally and keep the rarest result.", type:"bestof", value:12, color:"#ff684f", symbol:"♜"},
    {name:"Aurora Veil Tonic", desc:"Roll 20 times internally and keep the rarest result.", type:"bestof", value:20, color:"#91ffdb", symbol:"❋"},
    {name:"Singularity Solution", desc:"Guarantees a rollable aura with odds of at least 1 in 1e9.", type:"guarantee", value:1e9, color:"#bd8cff", symbol:"⦿"},
    {name:"Judgment Juice", desc:"Guarantees a rollable aura with odds of at least 1 in 1e15.", type:"guarantee", value:1e15, color:"#fff0b0", symbol:"⚡"},
    {name:"Phantom Requiem Potion", desc:"Guarantees a rollable aura with odds of at least 1 in 1e20.", type:"guarantee", value:1e20, color:"#b3a5ff", symbol:"♬"},
    {name:"Eclipse Seraph Elixir", desc:"Guarantees a rollable aura with odds of at least 1 in 1e26.", type:"guarantee", value:1e26, color:"#f5d9ff", symbol:"♱"},
    {name:"Infernal Crown Potion", desc:"Guarantees a rollable aura with odds of at least 1 in 1e32.", type:"guarantee", value:1e32, color:"#ff3d4e", symbol:"♛"},
    {name:"World Engine Serum", desc:"Roll 100 times internally and keep the rarest result.", type:"bestof", value:100, color:"#ffcf76", symbol:"⚙"},
    {name:"Universe Breaker Brew", desc:"Guarantees a rollable aura with odds of at least 1 in 1e36.", type:"guarantee", value:1e36, color:"#ff4d74", symbol:"✹"},
    {name:"Apex: Infinite Potion", desc:"Roll 250 times internally and keep the rarest result.", type:"bestof", value:250, color:"#ffffff", symbol:"∞"}
  ];
  // Declare both storage keys before loading saved values. loadActivePotion() reads this key.
  const ACTIVE_POTION_STORAGE_KEY = "aurabreak-active-potion-v1";
  const DEFAULT_POTION_INVENTORY = Object.fromEntries(POTIONS.map(potion => [potion.name, 1]));
  let potionInventory = loadPotionInventory();
  let activePotion = loadActivePotion();
  function loadPotionInventory() {
    try {
      const saved = JSON.parse(localStorage.getItem(POTION_STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") {
        // Give older saves one copy of newly introduced potions, but preserve explicit zero counts.
        return Object.fromEntries(POTIONS.map(potion => [
          potion.name,
          Object.prototype.hasOwnProperty.call(saved, potion.name)
            ? Math.max(0, Math.floor(Number(saved[potion.name]) || 0))
            : 1
        ]));
      }
    } catch {}
    return {...DEFAULT_POTION_INVENTORY};
  }
  function savePotionInventory() {
    try { localStorage.setItem(POTION_STORAGE_KEY, JSON.stringify(potionInventory)); } catch {}
  }
  function loadActivePotion() {
    try {
      const name = localStorage.getItem(ACTIVE_POTION_STORAGE_KEY);
      return POTIONS.find(potion => potion.name === name) || null;
    } catch { return null; }
  }
  function saveActivePotion() {
    try {
      if (activePotion) localStorage.setItem(ACTIVE_POTION_STORAGE_KEY, activePotion.name);
      else localStorage.removeItem(ACTIVE_POTION_STORAGE_KEY);
    } catch {}
  }
  const STORAGE_KEY = "aurabreak-discoveries-v1";
  const TRANSCENDENCE_KEY = "aurabreak-transcendence-unlocked-v1";
  const ORIGINAL_GODS = ["PURE DEITY", "CHAOTIC END", "GLITCHED SCREAMS", "LORE CREATIONIST", "THE MAKER"];
  let transcendenceUnlocked = localStorage.getItem(TRANSCENDENCE_KEY) === "yes";
  // Phase II can be unlocked permanently while the player still switches between phases.
  let phaseTwoActive = transcendenceUnlocked;
  let transcendencePending = false;
  let discovered = loadDiscoveries();
  let rolling = false;
  let forcedAura = null;
  let luckMultiplier = 1;
  let pendingAura = null;
  let cutsceneTimers = [];
  let nullAbsoluteStop = null;
  let fourthWallCleanup = null;
  let deityAudio = null;
  let toastTimer;
  let runRollCount = 0;
  let pureDeityEncounters = 0;
  let devAuthorized = false;
  let devSimplePatternCount = 0;

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
  // In AURABREAK II, even the most common aura sits beyond THE MAKER's original odds.
  const PHASE_TWO_ODDS_FLOOR = 10n ** 60n;
  function auraOdds(aura) {
    const base = BigInt(aura.odds);
    return phaseTwoActive ? base + PHASE_TWO_ODDS_FLOOR : base;
  }
  function noAuraResult() {
    return {
      name: "NO AURA",
      odds: 0n,
      rarity: "EMPTY",
      tier: "common",
      color: "#aab3c7",
      symbol: "∅",
      description: "You try to wave your hands, but nothing comes out.",
      style: "cosmic",
      noAura: true
    };
  }
  function chooseAura(applyPotion = true) {
    const potion = applyPotion ? activePotion : null;
    if (applyPotion && activePotion) {
      activePotion = null;
      saveActivePotion();
    }
    if (potion?.type === "god") {
      const gods = AURAS.filter(a => a.god && !a.adminOnly && !a.evolutionOnly);
      if (gods.length) return gods[Math.floor(Math.random() * gods.length)];
    }
    if (potion?.type === "guarantee") {
      const threshold = BigInt(Math.max(1, Math.floor(potion.value)));
      const eligible = AURAS.filter(a => !a.adminOnly && !a.evolutionOnly && auraOdds(a) >= threshold);
      if (eligible.length) return eligible[Math.floor(Math.random() * eligible.length)];
    }
    if (potion?.type === "bestof") {
      let best = null;
      const attempts = Math.min(250, Math.max(2, Number(potion.value) || 2));
      for (let i = 0; i < attempts; i++) {
        const candidate = chooseAura(false);
        if (!best || auraOdds(candidate) > auraOdds(best)) best = candidate;
      }
      return best || (phaseTwoActive ? noAuraResult() : AURAS[0]);
    }
    if (forcedAura) {
      const selected = forcedAura;
      forcedAura = null;
      return selected;
    }
    // Test rarest first. Phase II raises every aura above THE MAKER's original odds.
    const pool = AURAS.filter(a => !a.adminOnly && !a.evolutionOnly).sort((a, b) => {
      const ao = auraOdds(a), bo = auraOdds(b);
      return ao > bo ? -1 : ao < bo ? 1 : 0;
    });
    const potionLuck = potion?.type === "luck" ? Number(potion.value) : 1;
    const luck = Math.max(1, Number.isFinite(luckMultiplier * potionLuck) ? luckMultiplier * potionLuck : Number.MAX_VALUE);
    for (const aura of pool) {
      const odds = Number(auraOdds(aura));
      const chance = Math.min(1, luck / odds);
      if (Math.random() < chance) return aura;
    }
    return phaseTwoActive ? noAuraResult() : AURAS[0];
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
    content.classList.toggle("the-ending-result", aura.name === "THE ENDING");
    content.classList.toggle("null-absolute-result", aura.name === "NULL//ABSOLUTE");
    content.classList.toggle("the-viewer-result", aura.name === "THE VIEWER");
    $("orbCore").classList.toggle("the-ending-core", aura.name === "THE ENDING");
    $("orbCore").classList.toggle("null-absolute-core", aura.name === "NULL//ABSOLUTE");
    $("orbCore").classList.toggle("the-viewer-core", aura.name === "THE VIEWER");
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
      ["ODDS", aura.noAura ? "NO CHANCE — NOTHING MANIFESTED" : formatOdds(auraOdds(aura))],
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
  function renderPotions() {
    const grid = $("potionGrid");
    if (!grid) return;
    grid.replaceChildren();
    const count = POTIONS.reduce((sum, potion) => sum + (potionInventory[potion.name] || 0), 0);
    const countNode = $("potionCount");
    if (countNode) countNode.textContent = String(count);
    const active = $("activePotionLabel");
    if (active) active.textContent = activePotion ? "NEXT ROLL: " + activePotion.name.toUpperCase() : "NO POTION ACTIVE";
    POTIONS.forEach(potion => {
      const amount = potionInventory[potion.name] || 0;
      const card = document.createElement("article");
      card.className = "potion-card" + (activePotion?.name === potion.name ? " potion-active" : "");
      card.style.setProperty("--potion-color", potion.color);
      const icon = document.createElement("div");
      icon.className = "potion-symbol";
      icon.textContent = potion.symbol;
      const info = document.createElement("div");
      info.className = "potion-info";
      const title = document.createElement("h3");
      title.textContent = potion.name;
      const description = document.createElement("p");
      description.textContent = potion.desc;
      const amountLabel = document.createElement("span");
      amountLabel.className = "potion-amount";
      amountLabel.textContent = "OWNED ×" + amount;
      info.append(title, description, amountLabel);
      const use = document.createElement("button");
      use.type = "button";
      use.className = "potion-use";
      use.textContent = activePotion?.name === potion.name ? "ACTIVE" : "USE";
      use.disabled = amount < 1 || !!activePotion || rolling;
      use.addEventListener("click", () => {
        if (rolling || activePotion || !(potionInventory[potion.name] > 0)) return;
        potionInventory[potion.name]--;
        activePotion = potion;
        saveActivePotion();
        savePotionInventory();
        renderPotions();
        showToast(potion.name.toUpperCase() + " READY — NEXT ROLL.");
      });
      card.append(icon, info, use);
      grid.append(card);
    });
  }

  function renderCollection() {
    const grid = $("auraGrid");
    grid.innerHTML = "";
    const sorted = AURAS.filter(a => discovered.has(a.name)).sort((a,b) => Number(a.odds) - Number(b.odds));
    $("collectionCount").textContent = String(discovered.size);
    const countLabel = $("collectionCount").parentElement.querySelector("span");
    if (countLabel) countLabel.textContent = " / " + AURAS.length + " DISCOVERED";
    $("progressFill").style.width = (AURAS.length ? Math.min(100, discovered.size / AURAS.length * 100) : 0) + "%";
    if (!sorted.length) {
      const empty = document.createElement("div");
      empty.className = "collection-empty";
      empty.innerHTML = "<span>◇</span><p>No auras discovered yet.</p><small>YOUR FIRST DISCOVERY IS ONE ROLL AWAY.</small>";
      grid.append(empty);
      return;
    }
    sorted.forEach((aura, index) => {
      const tile = document.createElement("article");
      tile.className = "aura-tile " + aura.tier + (aura.name === "THE ENDING" ? " the-ending-tile" : "") + (aura.name === "NULL//ABSOLUTE" ? " null-absolute-tile" : "") + (aura.name === "THE VIEWER" ? " the-viewer-tile" : "");
      tile.style.animationDelay = Math.min(index * 35, 350) + "ms";
      const rarity = document.createElement("span"); rarity.className = "tile-rarity"; rarity.textContent = aura.rarity;
      const symbol = document.createElement("div"); symbol.className = "tile-symbol"; symbol.textContent = aura.symbol;
      const name = document.createElement("div"); name.className = "tile-name"; name.textContent = aura.name;
      const odds = document.createElement("div"); odds.className = "tile-odds"; odds.textContent = formatOdds(auraOdds(aura));
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
    "THUNDERHEART": {slug:"thunderheart",eyebrow:"STORM CORE AWAKENING",lines:["THE SKY STARTS TO PULSE.","LIGHTNING COILS AROUND A LIVING CORE.","THE STORM CHOOSES A HEART.","THUNDERHEART"],subtitles:["PRESSURE RISING.","THE CLOUDS ARE CHARGING.","THUNDER ANSWERS YOUR CALL.","A TEMPEST BOUND TO YOU"],notes:[146.83,220,329.63,493.88]},
    "FROSTBITE": {slug:"frostbite",eyebrow:"CRYOGENIC STAR DETECTED",lines:["THE AIR TURNS TO CRYSTAL.","A BLUE SUN FREEZES MID-FLARE.","WINTER HAS FOUND ITS CROWN.","FROSTBITE"],subtitles:["TEMPERATURE FALLING.","ICE SPREADS THROUGH THE SKY.","THE WORLD HOLDS ITS BREATH.","COLD BEYOND THE VOID"],notes:[261.63,329.63,392,523.25]},
    "TOXIC BLOOM": {slug:"toxic-bloom",eyebrow:"EXTRADIMENSIONAL FLORA",lines:["A SEED FALLS FROM NOWHERE.","NEON VINES REWRITE THE LANDSCAPE.","BEAUTY BECOMES THE CONTAGION.","TOXIC BLOOM"],subtitles:["LIFE SIGNATURE UNKNOWN.","THE ROOTS ARE EVERYWHERE.","DO NOT TOUCH THE LIGHT.","GROWTH WITHOUT PERMISSION"],notes:[164.81,246.94,369.99,554.37]},
    "PRISMATIC": {slug:"prismatic",eyebrow:"SPECTRUM COLLAPSE",lines:["ONE LIGHT BECOMES A THOUSAND.","COLOUR STARTS BENDING AROUND YOU.","EVERY POSSIBILITY SHINES AT ONCE.","PRISMATIC"],subtitles:["SPECTRUM EXPANDING.","REALITY REFRACTS.","ALL WORLDS SHARE ONE BEAM.","THE IMPOSSIBLE IN FULL COLOUR"],notes:[261.63,349.23,466.16,698.46]},
    "SOULFIRE": {slug:"soulfire",eyebrow:"SPIRITUAL REACTOR IGNITION",lines:["A FLAME APPEARS IN THE DARK.","IT BURNS WITHOUT FUEL OR SMOKE.","SOMETHING ANCIENT LOOKS BACK.","SOULFIRE"],subtitles:["FLAME SIGNATURE: ALIVE.","THE FIRE IS WATCHING.","IT KNOWS YOUR NAME.","A SOUL THAT CANNOT BE EXTINGUISHED"],notes:[110,164.81,246.94,369.99]},
    "CHRONO BREAK": {slug:"chrono-break",eyebrow:"TEMPORAL SEAL FAILURE",lines:["THE CLOCK MISSES A BEAT.","SECONDS SPIRAL BACK INTO THE SKY.","TIME BREAKS AROUND YOUR SHADOW.","CHRONO BREAK"],subtitles:["TIMELINE DESYNCHRONIZED.","PAST AND FUTURE COLLIDE.","THE MOMENT HAS NO END.","YOU OUTRAN THE CLOCK"],notes:[392,293.66,220,587.33]},
    "LEVIATHAN": {slug:"leviathan",eyebrow:"DEEP COSMIC LIFEFORM",lines:["SOMETHING MOVES BENEATH THE STARS.","A MASSIVE SHADOW CROSSES THE NEBULA.","THE DEEP HAS OPENED ITS EYE.","LEVIATHAN"],subtitles:["DEPTH: UNMEASURABLE.","GRAVITY IS PULLING SIDEWAYS.","DO NOT WAKE THE OCEAN.","THE COLOSSUS HAS RISEN"],notes:[98,146.83,196,293.66]},
    "DRAGON EMPEROR": {slug:"dragon-emperor",eyebrow:"ANCIENT FIRE SOVEREIGN",lines:["A ROAR SHAKES THE HORIZON.","WINGS BLOCK OUT THE SUN.","THE FIRST FLAME CLAIMS ITS THRONE.","DRAGON EMPEROR"],subtitles:["HEAT SIGNATURE RISING.","THE SKY IS NO LONGER YOURS.","AN EMPIRE OF ASH AND GOLD.","BOW TO THE ANCIENT FIRE"],notes:[130.81,196,261.63,392]},
    "AURORA VEIL": {slug:"aurora-veil",eyebrow:"POLAR LIGHT ANOMALY",lines:["THE NIGHT STARTS TO FLOW.","RIBBONS OF LIGHT DANCE ACROSS SPACE.","THE HEAVENS DRAW BACK THEIR VEIL.","AURORA VEIL"],subtitles:["LIGHT WAVES DETECTED.","THE STARS ARE DRIFTING.","COLOUR BECOMES A CURRENT.","THE SKY IS ALIVE"],notes:[329.63,392,493.88,659.25]},
    "SINGULARITY": {slug:"singularity",eyebrow:"GRAVITATIONAL EVENT HORIZON",lines:["EVERYTHING LEANS TOWARD THE CENTER.","SPACE FOLDS INTO A BLACK SUN.","NOTHING ESCAPES THE POINT.","SINGULARITY"],subtitles:["GRAVITY: CRITICAL.","DISTANCE IS COLLAPSING.","THE CENTER IS LOOKING BACK.","ONE POINT. INFINITE WEIGHT."],notes:[196,146.83,110,55]},
    "CELESTIAL JUDGMENT": {slug:"celestial-judgment",eyebrow:"DIVINE STRIKE LOCKED",lines:["THE CLOUDS SPLIT OPEN.","A COLUMN OF LIGHT DESCENDS.","THE SKY HAS PASSED ITS VERDICT.","CELESTIAL JUDGMENT"],subtitles:["TARGET ACQUIRED.","THE HEAVENS ARE ALIGNING.","NO SHADOW CAN HIDE.","JUDGMENT FROM BEYOND"],notes:[220,329.63,440,659.25]},
    "PHANTOM REQUIEM": {slug:"phantom-requiem",eyebrow:"SPECTRAL CHOIR DETECTED",lines:["A SONG RISES FROM AN EMPTY WORLD.","GHOSTLY LIGHTS DRIFT THROUGH THE VOID.","THE SILENCE SINGS YOUR NAME.","PHANTOM REQUIEM"],subtitles:["NO SOURCE FOUND.","THE CHOIR IS APPROACHING.","EVERY NOTE LEAVES AN ECHO.","A LAMENT ACROSS ETERNITY"],notes:[293.66,220,329.63,440]},
    "ECLIPSE SERAPH": {slug:"eclipse-seraph",eyebrow:"CELESTIAL ENTITY UNSEALED",lines:["A HALO SHATTERS ABOVE THE WORLD.","WINGS UNFOLD FROM THE ECLIPSE.","LIGHT AND SHADOW BECOME ONE.","ECLIPSE SERAPH"],subtitles:["RADIANCE DETECTED.","THE SUN HAS A SHADOW.","A HIGHER PRESENCE DESCENDS.","THE HEAVENS HAVE CHANGED"],notes:[261.63,392,523.25,783.99]},
    "INFERNAL CROWN": {slug:"infernal-crown",eyebrow:"HELLFIRE THRONE IGNITION",lines:["THE GROUND CRACKS OPEN.","A CROWN FORMS FROM LIVING FIRE.","THE UNDERWORLD HAS FOUND ITS KING.","INFERNAL CROWN"],subtitles:["MAGMA FLOW RISING.","THE THRONE IS EMPTY NO LONGER.","THE FLAMES ARE BOWING.","RULE THROUGH FIRE"],notes:[82.41,123.47,164.81,246.94]},
    "RIFTSTORM": {slug:"riftstorm",eyebrow:"DIMENSIONAL WEATHER EVENT",lines:["THE SKY SPLITS INTO LAYERS.","ENERGY WHIPS THROUGH OPEN REALITY.","THE STORM COMES FROM EVERYWHERE.","RIFTSTORM"],subtitles:["BOUNDARY FAILURE.","MULTIPLE WORLDS OVERLAPPING.","THE RIFT IS WIDENING.","A STORM BETWEEN UNIVERSES"],notes:[174.61,261.63,349.23,523.25]},
    "STAR EATER": {slug:"star-eater",eyebrow:"STELLAR PREDATOR DETECTED",lines:["ONE STAR GOES DARK.","THEN ANOTHER. THEN THE WHOLE SKY.","THE DARKNESS IS HUNGRY.","STAR EATER"],subtitles:["LIGHT OUTPUT FALLING.","CONSTELLATIONS DISAPPEARING.","THE VOID HAS TEETH.","IT FEEDS ON SUNS"],notes:[196,146.83,98,49]},
    "OMNIFLARE": {slug:"omniflare",eyebrow:"UNIVERSAL IGNITION",lines:["EVERY STAR IGNITES AT ONCE.","THE GALAXIES TURN INTO TORCHES.","THE ENTIRE COSMOS BECOMES ONE SUN.","OMNIFLARE"],subtitles:["ENERGY BEYOND SCALE.","THE SKY IS PURE LIGHT.","THE UNIVERSE IS BURNING BRIGHT.","ALL OF EXISTENCE, ILLUMINATED"],notes:[261.63,392,587.33,880]},
    "ETERNAL ZERO": {slug:"eternal-zero",eyebrow:"PRE-CREATION VOID",lines:["SOUND DISAPPEARS FIRST.","THEN COLOUR. THEN DISTANCE.","ONLY THE ZERO REMAINS.","ETERNAL ZERO"],subtitles:["SIGNAL: NONE.","THE WORLD IS UNWRITTEN.","NOT EVEN DARKNESS EXISTS HERE.","THE BEGINNING BEFORE BEGINNINGS"],notes:[220,164.81,110,55]},
    "DREAM//ERROR": {slug:"dream-error",eyebrow:"DREAM STATE CORRUPTED",lines:["THE SKY BLINKS.","THE WORLD MELTS BETWEEN FRAMES.","SOMETHING WOKE UP INSIDE THE DREAM.","DREAM//ERROR"],subtitles:["REALITY IS STILL LOADING.","GEOMETRY CANNOT AGREE.","DO YOU REMEMBER THIS PLACE?","THE NIGHTMARE HAS ADMIN ACCESS"],notes:[311.13,466.16,622.25,932.33]},
    "WORLD ENGINE": {slug:"world-engine",eyebrow:"CREATION MECHANISM EXPOSED",lines:["A GEAR TURNS BEHIND THE STARS.","THE SKY OPENS TO REVEAL THE MACHINE.","CREATION HAS MOVING PARTS.","WORLD ENGINE"],subtitles:["MECHANISM ONLINE.","THE UNIVERSE IS BEING BUILT.","EVERY LAW HAS A SWITCH.","YOU FOUND THE ENGINE ROOM"],notes:[164.81,246.94,329.63,493.88]},
    "GODSLEEP": {slug:"godsleep",eyebrow:"DIVINE DREAMSIGNAL",lines:["THE UNIVERSE FALLS ASLEEP.","A GIANT EYE MOVES BENEATH THE DREAM.","THE SLEEPING GOD IS STIRRING.","GODSLEEP"],subtitles:["DREAM DEPTH: UNKNOWN.","GALAXIES ARE ONLY THOUGHTS HERE.","DO NOT WAKE IT.","THE DREAMER IS OLDER THAN TIME"],notes:[146.83,220,329.63,440]},
    "FINAL HORIZON": {slug:"final-horizon",eyebrow:"EDGE OF ALL THINGS",lines:["THE STARS END IN A STRAIGHT LINE.","A DOOR APPEARS AT THE EDGE.","THE FINAL HORIZON OPENS.","FINAL HORIZON"],subtitles:["DISTANCE REMAINING: ZERO.","NO MAP GOES FURTHER.","THE OTHER SIDE IS CALLING.","THERE IS ALWAYS ONE MORE WORLD"],notes:[220,293.66,392,587.33]},
    "UNIVERSE BREAKER": {slug:"universe-breaker",eyebrow:"UNIVERSAL STRUCTURE FAILURE",lines:["THE CONSTELLATIONS BEGIN TO CRACK.","SPACE SHUDDERS LIKE GLASS.","THE UNIVERSE CANNOT HOLD THIS POWER.","UNIVERSE BREAKER"],subtitles:["STABILITY: 0%.","DIMENSIONS ARE SPLINTERING.","THE SKY IS COMING APART.","A POWER BUILT TO END WORLDS"],notes:[110,164.81,246.94,369.99]},
    "APEX: INFINITE": {slug:"apex-infinite",eyebrow:"LIMIT EXCEEDED",lines:["THE SCALE RUNS OUT OF NUMBERS.","THE FINAL CEILING DISAPPEARS.","THERE IS NO HIGHER PLACE.","APEX: INFINITE"],subtitles:["MEASUREMENT FAILED.","ALL LIMITS HAVE BEEN SURPASSED.","THE TOP IS NOWHERE.","INFINITE ASCENSION"],notes:[329.63,493.88,659.25,987.77]}
  };
  function startShattercoreCutscene(aura) {
    const cutscene = $("cutscene"), art = $("cutsceneArt");
    const content = cutscene.querySelector(".cutscene-content");
    const eyebrow = $("cutsceneEyebrow"), title = $("cutsceneTitle"), subtitle = $("cutsceneSubtitle");
    const button = $("closeCutscene");
    stopDeityCutscene();
    const evolved = aura.name === "SHATTERCORE: REBORN";
    cutscene.dataset.aura = aura.name;
    cutscene.dataset.style = "shattercore";
    cutscene.style.setProperty("--aura-color", aura.color);
    cutscene.style.setProperty("--movie-color", aura.color);
    art.innerHTML = '<div class="orb-break-space"></div><div class="orb-break-stars"></div><div class="orb-break-ring"></div><div class="orb-break-orb"><span>◇</span></div><div class="orb-break-cracks"></div><div class="orb-break-shards"></div><div class="orb-break-flash"></div>';
    eyebrow.textContent = evolved ? "THE FRACTURE HAS LEARNED TO LIVE" : "UNKNOWN CORE SIGNATURE • CONTAINMENT FAILING";
    title.className = "movie-title";
    title.textContent = "";
    title.style.color = aura.color;
    subtitle.className = "movie-subtitle";
    subtitle.textContent = "";
    button.textContent = "SKIP CUTSCENE ↗";
    content.classList.remove("deity-reveal");
    cutscene.classList.remove("movie-running","orb-break-cracking","orb-break-shatter","orb-break-reform","movie-finale");
    cutscene.classList.add("movie-running","orb-break-running");
    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    const line = (main, sub, cls = "movie-title") => {
      title.textContent = main;
      subtitle.textContent = sub;
      title.className = cls;
      content.classList.remove("movie-reveal");
      void content.offsetWidth;
      content.classList.add("movie-reveal");
    };
    const tone = (hz, duration, type = "sine", volume = 0.06) => playDeityTone(hz, duration, type, volume);

    line("DON'T TOUCH THE ORB.", "A HAIRLINE FRACTURE APPEARS.");
    later(4500, () => { line("...it heard you.", "SIGNAL ORIGIN: INSIDE THE CORE"); tone(196, 1.5, "triangle"); });
    later(9000, () => { line("SOMETHING IS KNOCKING.", "THREE TIMES. FROM THE WRONG SIDE."); tone(110, 2, "sine", 0.08); });
    later(14000, () => { line("THE SHELL IS LYING.", "THE ORB WAS BUILT TO KEEP SOMETHING IN."); cutscene.classList.add("orb-break-cracking"); tone(82, 2.4, "sawtooth", 0.08); });
    later(19500, () => { line("IT ISN'T POWER.", "IT'S THE THING THAT POWER WAS AFRAID OF."); tone(55, 2.8, "sawtooth", 0.1); });
    later(25000, () => { line("CONTAINMENT: 1%", "YOU SHOULD HAVE STOPPED ROLLING."); cutscene.classList.remove("orb-break-cracking"); cutscene.classList.add("orb-break-shatter"); tone(48, 3.2, "sawtooth", 0.12); });
    later(30500, () => { line("", "NO ORB. NO LIGHT. NO SOUND.", "movie-title movie-title-final"); });
    later(34500, () => { line("...YOU'RE STILL HERE.", "THE SHARDS ARE MOVING WITHOUT A CORE."); cutscene.classList.add("orb-break-reform"); tone(220, 2.4, "triangle", 0.07); });
    later(38500, () => { line(aura.name, evolved ? "THE FRACTURE HAS BECOME ITS OWN BEGINNING." : "THE ORB BROKE. THE WORLD DIDN'T.", "movie-title movie-title-final"); eyebrow.textContent = (evolved ? "FRACTURE EVOLUTION" : "FRACTURE EVENT") + " • 1 IN " + BigInt(aura.odds).toLocaleString("en-US"); });
    later(42000, () => { line("IT CAN BREAK AGAIN.", evolved ? "SEVEN STRIKES. A DIFFERENT KIND OF EVOLUTION." : "THE SEVENTH STRIKE WILL NOT BE AN ACCIDENT.", "movie-title movie-title-final"); });
    later(45000, () => {
      cutscene.classList.remove("movie-running","orb-break-running","orb-break-cracking","orb-break-shatter","orb-break-reform");
      button.textContent = evolved ? "CLAIM EVOLUTION ↗" : "CLAIM DISCOVERY ↗";
    });
  }
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
  function startTheEndingCutscene() {
    const cutscene = $("cutscene"), art = $("cutsceneArt");
    const content = cutscene.querySelector(".cutscene-content");
    const eyebrow = $("cutsceneEyebrow"), title = $("cutsceneTitle"), subtitle = $("cutsceneSubtitle");
    const button = $("closeCutscene");
    stopDeityCutscene();
    cutscene.dataset.style = "the-ending";
    cutscene.dataset.aura = "THE ENDING";
    cutscene.style.setProperty("--aura-color", "#ff294f");
    cutscene.style.setProperty("--movie-color", "#ff294f");
    art.innerHTML = '<div class="ending-void"></div><div class="ending-grid"></div><div class="ending-eclipse"></div><div class="ending-ring ending-ring-a"></div><div class="ending-ring ending-ring-b"></div><div class="ending-fractures"></div><div class="ending-glitch ending-glitch-a">REALITY NOT FOUND</div><div class="ending-glitch ending-glitch-b">END OF LINE</div><div class="ending-monolith"><span>⟡</span></div><div class="ending-shards"></div><div class="ending-whiteout"></div>';
    eyebrow.textContent = "FATAL ANOMALY • FINAL SEQUENCE INITIALIZED";
    title.textContent = "";
    title.className = "ending-line";
    title.style.color = "#fff";
    subtitle.textContent = "";
    button.textContent = "SKIP THE ENDING ↗";
    content.classList.remove("deity-reveal", "movie-reveal");
    cutscene.classList.remove("deity-running","deity-impact","galactic-running","galactic-break","movie-running","movie-finale","fallen-god-running","fallen-god-awakened","fallen-god-impact","developer-running","developer-overwrite","developer-impact");
    cutscene.classList.add("ending-running");
    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    const line = (a,b,cls="ending-line") => {
      title.textContent = a;
      title.className = cls;
      title.style.color = "#fff";
      subtitle.textContent = b;
      content.classList.remove("deity-reveal");
      void content.offsetWidth;
      content.classList.add("deity-reveal");
    };
    line("SIGNAL LOST.", "THE WORLD HAS STOPPED RESPONDING.");
    playDeityTone(65.4, 2.8, "sawtooth", .075);
    later(2300, () => {
      cutscene.classList.add("ending-collapse");
      eyebrow.textContent = "SPACE-TIME INTEGRITY: 0%";
      line("THE SKY IS A LIE.", "THE STARS ARE PIXELS. THE VOID IS A WALL.");
      playDeityTone(49, 3, "triangle", .08);
    });
    later(5100, () => {
      line("EVERY RULE ENDS.", "EVERY GOD. EVERY WORLD. EVERY SAVE FILE.");
      playDeityTone(36.7, 3.2, "sawtooth", .085);
    });
    later(7900, () => {
      cutscene.classList.add("ending-impact");
      eyebrow.textContent = "FATAL EXCEPTION • NO RECOVERY PATH";
      line("THIS IS THE LAST FRAME.", "THERE IS NOTHING AFTER THIS.");
      playDeityTone(27.5, 4.2, "sawtooth", .12);
    });
    later(11100, () => {
      cutscene.classList.remove("ending-impact");
      line("...");
      subtitle.textContent = "A SILENCE THAT SHOULD NOT EXIST.";
    });
    later(13700, () => {
      cutscene.classList.add("ending-final");
      eyebrow.textContent = "IMPOSSIBLE • BEYOND ALL KNOWN RANKS";
      line("THE ENDING", "THE FINAL ERROR. REALITY HAS REACHED THE LAST LINE OF ITS CODE.", "ending-final-title");
      playDeityTone(110, 4.5, "sine", .1);
    });
    later(17700, () => {
      line("END OF LINE.", "NO MORE ROLLS. NO MORE GODS. ONLY THE END.", "ending-final-title");
    });
    later(21500, () => {
      cutscene.classList.remove("ending-running");
      button.textContent = "CLAIM THE ENDING ↗";
    });
  }

  function startNullAbsoluteCutscene() {
    const cutscene = $("cutscene"), art = $("cutsceneArt");
    const content = cutscene.querySelector(".cutscene-content");
    const eyebrow = $("cutsceneEyebrow"), title = $("cutsceneTitle"), subtitle = $("cutsceneSubtitle");
    const button = $("closeCutscene");
    stopDeityCutscene();
    if (nullAbsoluteStop) { nullAbsoluteStop(); nullAbsoluteStop = null; }
    cutscene.dataset.style = "null-absolute";
    cutscene.dataset.aura = "NULL//ABSOLUTE";
    cutscene.style.setProperty("--aura-color", "#ff1b78");
    cutscene.style.setProperty("--movie-color", "#ff1b78");
    art.innerHTML = '<div class="null-absolute-fallback"></div><div class="na-scanlines"></div><div class="na-fracture"></div><div class="na-vignette"></div>';
    eyebrow.textContent = "UNRECOVERABLE RENDER • REALITY INDEX: NULL";
    title.textContent = "SIGNAL FOUND";
    title.className = "na-title";
    title.style.color = "#fff";
    subtitle.textContent = "A PRESENCE OUTSIDE THE GAME HAS RESPONDED.";
    button.textContent = "ESCAPE SEQUENCE ↗";
    content.classList.remove("deity-reveal", "movie-reveal");
    cutscene.classList.remove("ending-running","ending-collapse","ending-impact","ending-final","na-collapse","na-break","na-reveal","na-erasure");
    cutscene.classList.add("na-running");
    if (window.AURABREAK_NULL_ABSOLUTE && window.THREE) {
      try { nullAbsoluteStop = window.AURABREAK_NULL_ABSOLUTE.start(art); }
      catch (err) { console.warn("NULL//ABSOLUTE shader fallback active:", err); }
    }
    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    const line = (a,b,cls="na-title") => {
      title.textContent = a; title.className = cls; title.style.color = "#fff";
      subtitle.textContent = b;
      content.classList.remove("deity-reveal"); void content.offsetWidth; content.classList.add("deity-reveal");
    };
    playDeityTone(55, 2.5, "sawtooth", .08);
    later(2200, () => {
      cutscene.classList.add("na-collapse");
      eyebrow.textContent = "SPACE-TIME COORDINATES INVALID";
      line("THE WORLD IS A FILE.", "EVERY STAR. EVERY GOD. EVERY LINE OF CODE.");
      playDeityTone(41.2, 3, "triangle", .09);
    });
    later(4800, () => {
      cutscene.classList.add("na-break");
      eyebrow.textContent = "MEMORY MAP CORRUPTED • 0x000000";
      line("UNRENDER EVERYTHING.", "THE SHADER IS LOOKING BACK.");
      playDeityTone(30.8, 3.5, "sawtooth", .1);
    });
    later(7600, () => {
      eyebrow.textContent = "WARNING: NO KNOWN REALITY BOUNDARY";
      line("YOU WERE NEVER OUTSIDE.", "THE VOID WAS THE SCREEN.");
    });
    later(10100, () => {
      cutscene.classList.add("na-erasure");
      line("NULL.", "ALL LIGHT IS BEING REMOVED.");
      playDeityTone(24.5, 4.5, "sawtooth", .12);
    });
    later(12800, () => {
      cutscene.classList.add("na-reveal");
      eyebrow.textContent = "BEYOND IMPOSSIBLE • RANK ∅";
      line("NULL//ABSOLUTE", "THE UNIVERSE IS NOT ENDING. IT IS BEING UNRENDERED.", "na-final-title");
      playDeityTone(164.8, 4.8, "sine", .1);
    });
    later(16500, () => {
      line("NO FRAME AFTER THIS.", "THE LAST THING THE GAME WILL EVER SHOW.", "na-final-title");
    });
    later(19500, () => {
      cutscene.classList.remove("na-running");
      button.textContent = "CLAIM NULL//ABSOLUTE ↗";
    });
  }

  function startTheViewerCutscene() {
    const cutscene = $("cutscene"), art = $("cutsceneArt");
    const content = cutscene.querySelector(".cutscene-content");
    const eyebrow = $("cutsceneEyebrow"), title = $("cutsceneTitle"), subtitle = $("cutsceneSubtitle");
    const button = $("closeCutscene");
    stopDeityCutscene();
    if (nullAbsoluteStop) { nullAbsoluteStop(); nullAbsoluteStop = null; }
    if (fourthWallCleanup) { fourthWallCleanup(); fourthWallCleanup = null; }
    cutscene.dataset.style = "the-viewer";
    cutscene.dataset.aura = "THE VIEWER";
    cutscene.style.setProperty("--aura-color", "#b7fffe");
    art.innerHTML = '<div class="fw-starfield"></div><div class="fw-grid"></div><div class="fw-rift"></div><div class="fw-eye"><span>◉</span></div><div class="fw-orbit fw-orbit-a"></div><div class="fw-orbit fw-orbit-b"></div><div class="fw-target" aria-hidden="true">TARGET LOCKED<br><b>YOU</b></div><div class="fw-warning" aria-hidden="true">OBSERVER DETECTED</div><div class="fw-nebula" aria-hidden="true"></div><div class="fw-motes" aria-hidden="true"></div><div class="fw-aura-crown" aria-hidden="true"></div><div class="fw-sigil" aria-hidden="true">◉</div><div class="fw-shockwave" aria-hidden="true"></div><div class="fw-comets" aria-hidden="true"></div><div class="fw-floor" aria-hidden="true"></div><div class="fw-code" aria-hidden="true">01010100 01001000 01000101<br>YOU ARE HERE<br>RENDER TARGET: VIEWER</div><div class="fw-flash"></div>';
    eyebrow.textContent = "UNEXPECTED INPUT • OUTSIDE CONTEXT DETECTED";
    title.textContent = "WHO'S WATCHING?";
    title.className = "fw-title";
    title.style.color = "#fff";
    subtitle.textContent = "THE GAME HAS NOTICED THE PERSON PLAYING IT.";
    button.textContent = "TRY TO LEAVE ↗";
    content.classList.remove("deity-reveal", "movie-reveal");
    cutscene.classList.remove("na-running","na-collapse","na-break","na-reveal","na-erasure","fw-address","fw-glitch","fw-final");
    cutscene.classList.add("fw-running");
    const originalTitle = document.title;
    const move = event => {
      const rect = cutscene.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
      cutscene.style.setProperty("--fw-x", x.toFixed(3));
      cutscene.style.setProperty("--fw-y", y.toFixed(3));
      // Low-cost interaction: the eye tracks the cursor and locks on when it crosses the center.
      const nearCenter = Math.abs(x) < .18 && Math.abs(y) < .2;
      cutscene.classList.toggle("fw-target-locked", nearCenter);
    };
    cutscene.addEventListener("pointermove", move);
    const later = (ms, fn) => cutsceneTimers.push(setTimeout(fn, ms));
    const line = (a,b,cls="fw-title") => {
      title.textContent = a; title.className = cls; title.style.color = "#fff";
      subtitle.textContent = b;
      content.classList.remove("deity-reveal"); void content.offsetWidth; content.classList.add("deity-reveal");
    };
    playDeityTone(62, 1.8, "sine", .06);
    later(2400, () => {
      cutscene.classList.add("fw-address", "fw-awakening");
      eyebrow.textContent = "INPUT SOURCE: THIS WINDOW";
      line("YES. YOU.", "THE PERSON READING THIS LINE RIGHT NOW.");
      document.title = "YOU FOUND ME. — AURABREAK";
      cutscene.classList.add("fw-target-active");
      playDeityTone(220, 1.1, "triangle", .07);
    });
    later(5200, () => {
      cutscene.classList.add("fw-glitch", "fw-power-up");
      eyebrow.textContent = "CURSOR SIGNAL ACQUIRED";
      line("MOVE YOUR CURSOR.", "I CAN FOLLOW IT INSIDE THIS GAME. NOWHERE ELSE.");
      playDeityTone(110, 1.8, "sawtooth", .07);
    });
    later(8300, () => {
      line("THIS IS THE FOURTH WALL.", "YOU THOUGHT IT WAS JUST A SCREEN.");
      playDeityTone(82, 2, "triangle", .08);
    });
    later(11200, () => {
      cutscene.classList.add("fw-final", "fw-breakout");
      eyebrow.textContent = "THE VIEWER IS PART OF THE SCENE";
      line("YOU ARE THE FINAL VARIABLE.", "NO CHARACTER. NO NPC. THE ONE HOLDING THE CONTROLS.");
      cutscene.classList.add("fw-target-active", "fw-signal-break");
      playDeityTone(55, 2.6, "sawtooth", .1);
    });
    later(15100, () => {
      cutscene.classList.add("fw-awakening", "fw-power-up", "fw-breakout");
      line("THE VIEWER", "THE RAREST THING IN AURABREAK IS YOU.", "fw-final-title");
      eyebrow.textContent = "FOURTH-WALL FAILURE • 1 IN " + (10n ** 200n).toLocaleString("en-US");
      playDeityTone(440, 2.2, "sine", .08);
    });
    later(19000, () => {
      line("...STILL THERE?", "THE GAME WILL WAIT. IT ONLY RUNS WHEN YOU PLAY.", "fw-final-title");
    });
    later(22500, () => {
      cutscene.classList.remove("fw-running", "fw-power-up");
      button.textContent = "CLAIM THE VIEWER ↗";
    });
    fourthWallCleanup = () => {
      cutscene.removeEventListener("pointermove", move);
      cutscene.style.setProperty("--fw-x", "0");
      cutscene.style.setProperty("--fw-y", "0");
      document.title = originalTitle;
    };
  }

  function showCutscene(aura) {
    const cutscene = $("cutscene");
    const title = $("cutsceneTitle");
    const subtitle = $("cutsceneSubtitle");
    const art = $("cutsceneArt");
    if (!cutscene || !title || !subtitle || !art || !aura) {
      console.error("[AURABREAK cutscene] Missing cutscene DOM element or aura.", { aura });
      showToast("CUTSCENE ERROR: required screen element missing.");
      return;
    }
    // Reveal the overlay before starting an animation so an animation error cannot keep it hidden.
    cutscene.dataset.style = aura.style || "cosmic";
    cutscene.dataset.aura = aura.name || "UNKNOWN";
    cutscene.style.setProperty("--aura-color", aura.color || "#ffffff");
    cutscene.style.setProperty("--movie-color", aura.color || "#ffffff");
    $("cutsceneEyebrow").textContent = aura.secret ? "UNCLASSIFIED REALITY FAILURE" : "ANOMALY EVENT DETECTED";
    title.textContent = aura.name || "UNKNOWN";
    title.style.color = aura.color || "#ffffff";
    subtitle.textContent = aura.secret ? "THE RULES NO LONGER APPLY." : String(aura.description || "REALITY IS CHANGING.").toUpperCase();
    art.replaceChildren();
    cutscene.classList.remove(
      "deity-running", "deity-impact", "galactic-running", "galactic-break",
      "movie-running", "movie-finale", "fallen-god-running", "fallen-god-awakened",
      "fallen-god-impact", "developer-running", "developer-overwrite", "developer-impact",
      "ending-running", "ending-collapse", "ending-impact", "ending-final",
      "transcendence-running", "transcendence-break", "fw-running", "fw-address", "fw-glitch", "fw-final"
    );
    cutscene.classList.remove("hidden");
    cutscene.setAttribute("aria-hidden", "false");
    $("closeCutscene").textContent = "CLAIM DISCOVERY ↗";
    try {
      if (aura.name === "THE VIEWER") startTheViewerCutscene();
      else if (aura.name === "NULL//ABSOLUTE") startNullAbsoluteCutscene();
      else if (aura.name === "SHATTERCORE" || aura.name === "SHATTERCORE: REBORN") startShattercoreCutscene(aura);
      else if (aura.name === "PURE DEITY") startPureDeityCutscene();
      else if (aura.name === "PURE DEITY:GALACTIC") startGalacticCutscene();
      else if (aura.name === "THE FALLEN GOD") startFallenGodCutscene();
      else if (aura.name === "DEVELOPER") startDeveloperCutscene();
      else if (aura.name === "THE ENDING") startTheEndingCutscene();
      else startAuraMovie(aura);
    } catch (error) {
      console.error("[AURABREAK cutscene] Special animation failed; using fallback.", aura.name, error);
      cutscene.classList.remove(
        "deity-running", "deity-impact", "galactic-running", "galactic-break",
        "movie-running", "movie-finale", "fallen-god-running", "fallen-god-awakened",
        "fallen-god-impact", "developer-running", "developer-overwrite", "developer-impact",
        "ending-running", "ending-collapse", "ending-impact", "ending-final"
      );
      art.replaceChildren();
      subtitle.textContent = "THE ANOMALY HAS MANIFESTED.";
      try { startAuraMovie(aura); }
      catch (fallbackError) {
        console.error("[AURABREAK cutscene] Fallback animation also failed.", fallbackError);
        art.textContent = aura.symbol || "✦";
        art.style.fontSize = "clamp(5rem, 18vw, 12rem)";
        art.style.color = aura.color || "#ffffff";
      }
      showToast("CUTSCENE FALLBACK: " + (aura.name || "UNKNOWN"));
    }
  }
  function closeCutscene() {
    stopDeityCutscene();
    if (nullAbsoluteStop) { nullAbsoluteStop(); nullAbsoluteStop = null; }
    if (fourthWallCleanup) { fourthWallCleanup(); fourthWallCleanup = null; }
    const cutscene = $("cutscene");
    if (cutscene.dataset.style === "transcendence") activateTranscendenceMode();
    cutscene.classList.add("hidden");
    cutscene.classList.remove("deity-running", "deity-impact", "galactic-running", "galactic-break", "movie-running", "movie-finale", "fallen-god-running", "fallen-god-awakened", "fallen-god-impact", "developer-running", "developer-overwrite", "developer-impact", "orb-break-running", "orb-break-cracking", "orb-break-shatter", "orb-break-reform", "ending-running", "ending-collapse", "ending-impact", "ending-final", "na-running", "na-collapse", "na-break", "na-reveal", "na-erasure", "orb-break-running", "orb-break-cracking", "orb-break-shatter", "orb-break-reform");
    cutscene.classList.remove("fw-running","fw-address","fw-glitch","fw-final");
    cutscene.setAttribute("aria-hidden", "true");
    $("closeCutscene").textContent = "CLAIM DISCOVERY ↗";
    if (pendingAura) {
      renderResult(pendingAura, pendingAura.name === "SHATTERCORE: REBORN" || !discovered.has(pendingAura.name));
      pendingAura = null;
    }
    if (transcendencePending && !transcendenceUnlocked) {
      transcendencePending = false;
      startTranscendenceCutscene();
      cutscene.classList.remove("hidden");
      cutscene.setAttribute("aria-hidden", "false");
    }
  }
  function updatePhaseToggle() {
    const button = $("phaseToggle");
    if (!button) return;
    button.hidden = !transcendenceUnlocked;
    button.textContent = document.body.classList.contains("transcendence-mode")
      ? "RETURN TO AURABREAK I ↶"
      : "ENTER AURABREAK II ↗";
    button.setAttribute("aria-label", document.body.classList.contains("transcendence-mode")
      ? "Switch back to AURABREAK I"
      : "Switch to AURABREAK II");
  }
  function activateTranscendenceMode() {
    transcendenceUnlocked = true;
    phaseTwoActive = true;
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
    updatePhaseToggle();
  }
  function activateBaseMode() {
    phaseTwoActive = false;
    document.body.classList.remove("transcendence-mode");
    document.title = "AURABREAK — Roll Beyond Reality";
    const brand = document.querySelector(".brand");
    if (brand) brand.innerHTML = '<span class="brand-mark">A</span><span>AURA<span class="brand-light">BREAK</span><small>ROLL BEYOND REALITY</small></span>';
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) heroTitle.innerHTML = 'ROLL BEYOND<br><span>REALITY.</span>';
    const heroCopy = document.querySelector(".hero-copy");
    if (heroCopy) heroCopy.innerHTML = 'Every roll is a new possibility. Find the impossible.<br>Become the anomaly.';
    const eyebrow = document.querySelector(".hero .eyebrow");
    if (eyebrow) eyebrow.innerHTML = '<span class="eyebrow-line"></span> THE UNIVERSE IS YOURS TO BREAK';
    const status = document.querySelector(".top-status");
    if (status) status.innerHTML = '<span class="status-dot"></span> REALITY STABLE <span class="version">PRE-ALPHA 0.1</span>';
    const stage = $("stageLabel");
    if (stage) stage.textContent = "AWAITING YOUR WILL";
    updatePhaseToggle();
  }
  // Hidden rhythm puzzle: the orb only responds to a precise pattern of silence.
  let shattercoreRhythm = [];
  let shattercoreLastTap = 0;
  const shattercoreIntervals = [700, 1700, 700, 2700, 1200, 3200, 700];
  const shattercoreTolerance = 240;
  $("orbCore").addEventListener("click", () => {
    // The original easy seven-tap pattern is reserved for an authenticated DEV session.
    if (devAuthorized) {
      if (!discovered.has("SHATTERCORE") || discovered.has("SHATTERCORE: REBORN") || rolling) return;
      devSimplePatternCount++;
      $("orbCore").classList.remove("orb-strike");
      void $("orbCore").offsetWidth;
      $("orbCore").classList.add("orb-strike");
      if (devSimplePatternCount < 7) {
        showToast("DEV RESONANCE: " + devSimplePatternCount + "/7");
        return;
      }
      devSimplePatternCount = 0;
      const devEvolution = AURAS.find(a => a.name === "SHATTERCORE: REBORN");
      discovered.add(devEvolution.name);
      saveDiscoveries();
      renderCollection();
      showToast("DEV OVERRIDE: SHATTERCORE: REBORN GRANTED");
      pendingAura = devEvolution;
      showCutscene(devEvolution);
      $("cutscene").classList.remove("hidden");
      $("cutscene").setAttribute("aria-hidden", "false");
      return;
    }
    if (!discovered.has("SHATTERCORE") || discovered.has("SHATTERCORE: REBORN") || rolling) return;
    const now = performance.now();
    if (!shattercoreRhythm.length) {
      shattercoreRhythm = [now];
      shattercoreLastTap = now;
      showToast("THE BROKEN CORE LISTENS...");
      $("orbCore").classList.remove("orb-strike");
      void $("orbCore").offsetWidth;
      $("orbCore").classList.add("orb-strike");
      return;
    }
    const interval = now - shattercoreLastTap;
    const expected = shattercoreIntervals[shattercoreRhythm.length - 1];
    if (expected === undefined || Math.abs(interval - expected) > shattercoreTolerance) {
      shattercoreRhythm = [];
      shattercoreLastTap = 0;
      $("orbCore").classList.remove("orb-strike");
      void $("orbCore").offsetWidth;
      $("orbCore").classList.add("orb-strike");
      showToast("THE RESONANCE COLLAPSED. THE SILENCE WAS WRONG.");
      return;
    }
    shattercoreRhythm.push(now);
    shattercoreLastTap = now;
    $("orbCore").classList.remove("orb-strike");
    void $("orbCore").offsetWidth;
    $("orbCore").classList.add("orb-strike");
    if (shattercoreRhythm.length < 8) {
      showToast("A FAINT RESONANCE ANSWERS...");
      return;
    }
    shattercoreRhythm = [];
    shattercoreLastTap = 0;
    const evolution = AURAS.find(a => a.name === "SHATTERCORE: REBORN");
    discovered.add(evolution.name);
    saveDiscoveries();
    renderCollection();
    showToast("EVOLUTION UNLOCKED: SHATTERCORE: REBORN");
    pendingAura = evolution;
    showCutscene(evolution);
    $("cutscene").classList.remove("hidden");
    $("cutscene").setAttribute("aria-hidden", "false");
  });
  $("phaseToggle").addEventListener("click", () => {
    if (!transcendenceUnlocked) return;
    if (document.body.classList.contains("transcendence-mode")) {
      activateBaseMode();
      showToast("RETURNED TO AURABREAK I.");
    } else {
      activateTranscendenceMode();
      showToast("AURABREAK II ACTIVATED.");
    }
    renderCollection();
  });
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
  else updatePhaseToggle();
  function roll() {
    if (rolling) return;
    rolling = true;
    $("rollButton").disabled = true;
    document.body.classList.add("rolling");
    $("stageLabel").textContent = "REALITY IS REARRANGING...";
    let aura = chooseAura();
    renderPotions();
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
      const isNoAura = !!aura.noAura;
      const isNew = !isNoAura && !discovered.has(aura.name);
      if (!isNoAura) discovered.add(aura.name);
      if (!transcendenceUnlocked && ORIGINAL_GODS.every(name => discovered.has(name))) transcendencePending = true;
      saveDiscoveries();
      renderCollection();
      renderResult(aura, isNew);
      // Every successful manual roll gets its cutscene in both phases.
      if (!isNoAura) {
        pendingAura = aura;
        showCutscene(aura);
      } else {
        showToast("NOTHING MANIFESTED.");
      }
      if (transcendencePending && !transcendenceUnlocked && $("cutscene").classList.contains("hidden")) {
        setTimeout(() => {
          if (!transcendencePending || transcendenceUnlocked) return;
          startTranscendenceCutscene();
          $("cutscene").classList.remove("hidden");
          $("cutscene").setAttribute("aria-hidden", "false");
        }, 350);
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

  // Admin tools: Shift+A toggles the panel after a server-side Supabase DEV authorization check.
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
  // DEV access is checked against Supabase Auth and the server-side dev_authorizations table.
  // A browser/device ID is not a secret and is never used as an authorization credential.
  const AURABREAK_SUPABASE_URL = "https://acwdieavymmvhqilllvp.supabase.co";
  const AURABREAK_SUPABASE_KEY = "sb_publishable_HvQ5ZcGKmVKhkhrz9Z3Afw_S6-ADCys";
  const auraSupabase = window.supabase?.createClient(AURABREAK_SUPABASE_URL, AURABREAK_SUPABASE_KEY);

  async function authorizeDev() {
    if (!auraSupabase) {
      window.alert("AURABREAK sign-in couldn't start because the Supabase client didn't load. Refresh the page and try again.");
      return false;
    }

    try {
      let { data: sessionData, error: sessionError } = await auraSupabase.auth.getSession();
      if (sessionError) throw sessionError;

      // Passwordless anonymous session: no email, inbox, or confirmation link required.
      if (!sessionData.session) {
        showToast("CREATING AURABREAK DEV SESSION…");
        const { data, error } = await auraSupabase.auth.signInAnonymously();
        if (error) {
          console.error("AURABREAK anonymous sign-in error:", error);
          window.alert(
            "AURABREAK couldn't create a no-email session.\\n\\n" +
            error.message +
            "\\n\\nThe project owner may need to enable Anonymous Sign-Ins in Supabase: Authentication → Sign In / Providers → Anonymous."
          );
          return false;
        }
        sessionData = { session: data.session };
      }

      showToast("CHECKING DEV ACCESS…");
      const { data, error } = await auraSupabase.functions.invoke("dev-auth");
      if (error) {
        console.error("AURABREAK dev-auth error:", error);
        window.alert("Your session was created, but DEV access couldn't be checked.\\n\\n" + (error.message || "Please refresh and try again."));
        return false;
      }

      if (!data?.isDev) {
        devAuthorized = false;
        window.alert(
          "Your AURABREAK session is ready, but DEV access hasn't been approved yet.\\n\\n" +
          "Your user ID:\\n" + sessionData.session.user.id +
          "\\n\\nSend only this user ID to the project owner for approval. No email or confirmation link is needed."
        );
        showToast("DEV ACCESS NOT APPROVED.");
        return false;
      }

      devAuthorized = true;
      showToast("DEV ACCESS VERIFIED.");
      return true;
    } catch (error) {
      console.error("AURABREAK sign-in exception:", error);
      window.alert("AURABREAK sign-in hit a problem.\\n\\n" + (error?.message || String(error)) + "\\n\\nRefresh the page and try again.");
      return false;
    }
  }

  async function toggleAdmin() {
    if (!adminPanel.classList.contains("hidden")) {
      adminPanel.classList.add("hidden");
      adminPanel.setAttribute("aria-hidden", "true");
      return;
    }
    if (!(await authorizeDev())) return;
    adminPanel.classList.remove("hidden");
    adminPanel.setAttribute("aria-hidden", "false");
    refreshAdminAuraOptions();
  }
  document.addEventListener("keydown", event => {
    if (event.shiftKey && event.code === "KeyA" && !event.repeat) {
      event.preventDefault();
      toggleAdmin();
    }
  });
  $("adminClose").addEventListener("click", toggleAdmin);
  adminUnlockAll.addEventListener("click", () => {
    if (!devAuthorized) return showToast("DEV AUTHORITY REQUIRED.");
    AURAS.forEach(aura => discovered.add(aura.name));
    saveDiscoveries(); renderCollection();
    showToast("DEV OVERRIDE: EVERY AURA GRANTED.");
  });
  function grantAuraDirect(aura) {
    if (!devAuthorized || !aura) return showToast("DEV AUTHORITY REQUIRED.");
    discovered.add(aura.name);
    saveDiscoveries();
    renderCollection();
    pendingAura = aura;
    showCutscene(aura);
    $("cutscene").classList.remove("hidden");
    $("cutscene").setAttribute("aria-hidden", "false");
    showToast("DEV GRANTED: " + aura.name);
  }
  $("adminGrantAura").addEventListener("click", () => {
    grantAuraDirect(AURAS.find(item => item.name === adminAuraSelect.value));
  });
  $("adminGrantDeveloper").addEventListener("click", () => {
    grantAuraDirect(AURAS.find(item => item.name === "DEVELOPER"));
  });
  adminTellTruth.addEventListener("click", () => {
    if (!devAuthorized) return showToast("DEV AUTHORITY REQUIRED.");
    toggleAdmin();
    pendingAura = null;
    startTruthReveal();
    $("cutscene").classList.remove("hidden");
    $("cutscene").setAttribute("aria-hidden", "false");
  });
  $("adminForceAura").addEventListener("click", () => {
    if (!devAuthorized) return showToast("DEV AUTHORITY REQUIRED.");
    const aura = AURAS.find(item => item.name === adminAuraSelect.value);
    if (!aura) return;
    forcedAura = aura;
    $("adminForceAura").textContent = "NEXT ROLL: " + aura.name;
    showToast("RIGGED: your next manual roll will be " + aura.name);
  });
  adminLuck.addEventListener("input", () => {
    if (!devAuthorized) return;
    const raw = String(adminLuck.value || "1").trim();
    const parsed = Number(raw);
    luckMultiplier = Math.max(1, Number.isFinite(parsed) ? parsed : Number.MAX_VALUE);
    adminLuckValue.textContent = "×" + (Number.isFinite(parsed) ? parsed.toLocaleString("en-US") : "MAX");
    $("luckValue").textContent = adminLuckValue.textContent.slice(1);
  });
  $("adminAddAura").addEventListener("click", () => {
    if (!devAuthorized) return showToast("DEV AUTHORITY REQUIRED.");
    const name = customAuraName.value.trim().toUpperCase();
    if (name === "HI") return showToast("The temporary HI test aura has been removed.");
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
    renderCollection();
    showToast("Added custom aura: " + name);
  });

  // Admin command console. Commands are parsed explicitly; arbitrary JavaScript is never executed.
  const adminConsoleForm = $("adminConsoleForm");
  const adminConsoleInput = $("adminConsoleInput");
  const adminConsoleOutput = $("adminConsoleOutput");

  function consoleWrite(message, kind = "") {
    if (!adminConsoleOutput) return;
    const line = document.createElement("div");
    line.className = "console-line" + (kind ? " " + kind : "");
    line.textContent = String(message);
    adminConsoleOutput.append(line);
    adminConsoleOutput.scrollTop = adminConsoleOutput.scrollHeight;
  }

  function consoleHelp() {
    consoleWrite("Available commands:", "system");
    consoleWrite("help                 Show this command list");
    consoleWrite("status               Show game/admin status");
    consoleWrite("auras                List aura names");
    consoleWrite("find <text>          Search aura names");
    consoleWrite("info <aura name>     Show aura details");
    consoleWrite("roll [count]         Roll once or bulk roll up to 10000 times");
    consoleWrite("potions              List potion inventory");
    consoleWrite("luck <number>        Set the luck multiplier");
    consoleWrite("grant <aura name>    Grant an aura directly");
    consoleWrite("clear                Clear terminal output");
  }

  function runAdminCommand(rawCommand) {
    const command = String(rawCommand || "").trim();
    if (!command) return;
    consoleWrite("AURA> " + command, "command");
    if (!devAuthorized) {
      consoleWrite("Access denied: verified DEV authorization is required.", "error");
      return;
    }
    const [verbRaw, ...rest] = command.split(/\s+/);
    const verb = verbRaw.toLowerCase();
    const argument = rest.join(" ").trim();

    if (verb === "clear") {
      adminConsoleOutput.replaceChildren();
      return;
    }
    if (verb === "help") return consoleHelp();
    if (verb === "potions") { consoleWrite("Potion inventory: " + POTIONS.reduce((sum, potion) => sum + (potionInventory[potion.name] || 0), 0) + " total. Open the POTION VAULT on the main page to use one."); POTIONS.forEach(potion => consoleWrite(potion.name + " ×" + (potionInventory[potion.name] || 0))); return; }
    if (verb === "status") {
      consoleWrite("DEV access: verified", "success");
      consoleWrite("Auras registered: " + AURAS.length);
      consoleWrite("Discovered: " + discovered.size);
      consoleWrite("Luck multiplier: " + String(luckMultiplier));
      consoleWrite("AURA Script runtime: " + (window.AURA?.version || "not loaded"));
      return;
    }
    if (verb === "auras") {
      consoleWrite("Aura catalogue (" + AURAS.length + "):", "system");
      AURAS.forEach((aura, index) => consoleWrite((index + 1) + ". " + aura.name + " — " + formatOdds(aura.odds)));
      return;
    }
    if (verb === "find") {
      if (!argument) return consoleWrite("Usage: find <text>", "error");
      const found = AURAS.filter(aura => aura.name.toLowerCase().includes(argument.toLowerCase()));
      consoleWrite("Matches: " + found.length, "system");
      found.forEach(aura => consoleWrite(aura.name + " — " + formatOdds(aura.odds)));
      return;
    }
    if (verb === "info") {
      if (!argument) return consoleWrite("Usage: info <aura name>", "error");
      const aura = AURAS.find(item => item.name.toLowerCase() === argument.toLowerCase());
      if (!aura) return consoleWrite("Aura not found: " + argument, "error");
      consoleWrite("Name: " + aura.name, "success");
      consoleWrite("Rarity: " + (aura.rarity || aura.tier || "—"));
      consoleWrite("Odds: " + formatOdds(aura.odds));
      consoleWrite("Discovered: " + (discovered.has(aura.name) ? "yes" : "no"));
      consoleWrite("Description: " + (aura.description || "—"));
      return;
    }
    if (verb === "roll") {
      if (!argument) {
        consoleWrite("Running a normal game roll…", "system");
        roll();
        return;
      }
      if (!/^\\d+$/.test(argument)) return consoleWrite("Usage: roll [count] — count must be a whole number from 1 to 10000.", "error");
      const count = Number(argument);
      if (!Number.isSafeInteger(count) || count < 1 || count > 10000) {
        return consoleWrite("Bulk roll count must be from 1 to 10000.", "error");
      }
      if (rolling) return consoleWrite("A roll is already in progress. Wait for it to finish first.", "error");
      const totals = new Map();
      let newDiscoveries = 0;
      let emptyRolls = 0;
      for (let i = 0; i < count; i++) {
        let aura = chooseAura();
        runRollCount++;
        if (runRollCount > 5000) { runRollCount = 1; pureDeityEncounters = 0; }
        if (aura.name === "PURE DEITY") {
          pureDeityEncounters++;
          if (pureDeityEncounters === 2) aura = AURAS.find(a => a.name === "PURE DEITY:GALACTIC") || aura;
        }
        totals.set(aura.name, (totals.get(aura.name) || 0) + 1);
        if (aura.noAura) {
          emptyRolls++;
        } else if (!discovered.has(aura.name)) {
          discovered.add(aura.name);
          newDiscoveries++;
        }
      }
      saveDiscoveries();
      renderCollection();
      renderPotions();
      consoleWrite("Bulk roll complete: " + count.toLocaleString("en-US") + " rolls.", "success");
      consoleWrite("New discoveries: " + newDiscoveries + " | Empty rolls: " + emptyRolls);
      consoleWrite("Most frequent results:", "system");
      [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)
        .forEach(([name, amount]) => consoleWrite(name + " × " + amount.toLocaleString("en-US")));
      consoleWrite("Collection: " + discovered.size + " discovered.", "success");
      return;
    }
    if (verb === "luck") {
      if (!argument) return consoleWrite("Usage: luck <number>", "error");
      const parsed = Number(argument);
      if (!Number.isFinite(parsed) || parsed < 1) return consoleWrite("Luck must be a finite number of at least 1.", "error");
      adminLuck.value = String(parsed);
      adminLuck.dispatchEvent(new Event("input", { bubbles: true }));
      consoleWrite("Luck multiplier set to ×" + parsed.toLocaleString("en-US"), "success");
      return;
    }
    if (verb === "grant") {
      if (!argument) return consoleWrite("Usage: grant <aura name>", "error");
      const aura = AURAS.find(item => item.name.toLowerCase() === argument.toLowerCase());
      if (!aura) return consoleWrite("Aura not found: " + argument, "error");
      consoleWrite("Granting " + aura.name + "…", "success");
      grantAuraDirect(aura);
      return;
    }
    consoleWrite('Unknown command "' + verb + '". Type help to see available commands.', "error");
  }

  if (adminConsoleForm) {
    adminConsoleForm.addEventListener("submit", event => {
      event.preventDefault();
      runAdminCommand(adminConsoleInput.value);
      adminConsoleInput.value = "";
    });
  }

  renderCollection();
  renderPotions();

  // Backfill progression for players who discovered all five gods before Phase II existed.
  if (!transcendenceUnlocked && ORIGINAL_GODS.every(name => discovered.has(name))) {
    transcendencePending = true;
    setTimeout(() => {
      if (transcendenceUnlocked || !transcendencePending) return;
      transcendencePending = false;
      startTranscendenceCutscene();
      $("cutscene").classList.remove("hidden");
      $("cutscene").setAttribute("aria-hidden", "false");
    }, 900);
  }
})();