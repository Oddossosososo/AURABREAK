# AURABREAK — Roll Beyond Reality

A dark cosmic aura-rolling prototype built for the browser.

## AURA Script v0.2.0

AURA Script now has a small RNG runtime as well as its original data parser.

### File types

- `.aura` — aura metadata: name, odds, rarity, color, symbol, description, and cutscene name.
- `.auracutsense` — cutscene metadata: duration, title, subtitle, ordered effect commands, and reveal name.
- `.auraroll` — a roll pool that lists aura names and a base luck multiplier.

### Aura example

```aura
aura "APEX: INFINITE" {
  odds: 1e41
  rarity: "PRE-GOD ASCENDANT"
  color: "#ffffff"
  symbol: "∞"
  description: "The limit was an illusion."
  cutscene: "APEX: INFINITE"
}
```

### Roll pool example

```auraroll
roll "BasicPool" {
  base_luck: 1
  aura: "COMMON"
  aura: "APEX: INFINITE"
}
```

### JavaScript API

Register definitions from source text, in this order:

```js
AURA.registerAura(commonAuraSource);
AURA.registerAura(apexAuraSource);
AURA.registerRoll(poolSource);
const result = AURA.roll("BasicPool", 2); // extra luck multiplier
console.log(result?.name ?? "No aura this roll");
```

- `AURA.registerAura(source)` parses and stores an aura.
- `AURA.registerCutscene(source)` parses and stores a cutscene.
- `AURA.registerRoll(source)` parses and stores a roll pool.
- `AURA.roll(poolName, luckMod = 1)` executes a roll and returns the selected aura object, or `null` if no aura wins.
- `AURA.getAura(name)`, `AURA.getCutscene(name)`, and `AURA.getRoll(name)` retrieve registered definitions.
- `AURA.listAuras()`, `AURA.listCutscenes()`, and `AURA.listRolls()` list registered definitions.

### RNG behavior and limitations

Each aura's `odds` means “1 in X.” For a given aura, the chance is `min(1, base_luck × luckMod / odds)`. The runtime checks the pool's registered auras from rarest to most common; if none wins, it returns `null`. A failed roll stays distinct from a common aura. Luck must be a finite non-negative JavaScript number.

Pool `aura:` entries must refer to aura definitions already registered. The example references `COMMON` and `APEX: INFINITE`; register both definitions before rolling. The language does not yet automatically load files, connect to the site's existing roll button, execute cutscene effects, or support general-purpose variables, conditions, imports, or event hooks. It is a small domain-specific language, not a full JavaScript replacement.

## Run it

Open `index.html` in a modern browser, or enable GitHub Pages for this repository using **Settings → Pages → Deploy from a branch → main → /(root)**.

## Prototype features

- Aura roll animation and rarity display
- Collection saved in this browser with localStorage
- Special-event aura visuals and cutscenes
- Responsive dark interface

This is a front-end demo; browser-local progress is not a secure account system.
