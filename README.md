# AURABREAK — Roll Beyond Reality

A dark cosmic aura-rolling prototype built for the browser.

## AURA Script (early prototype)

AURABREAK's own data language is being developed with two file types:

- `.aura` — aura metadata such as odds, rarity, color, symbol, description, and its cutscene name.
- `.auracutsense` — cinematic metadata and ordered effect commands.

Example `.aura`:

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

Example `.auracutsense`:

```auracutsense
cutscene "APEX: INFINITE" {
  duration: 12000
  title: "THE LIMIT WAS AN ILLUSION"
  subtitle: "YOU HAVE STEPPED BEYOND INFINITY"
  effect: reality.break
  effect: stars.explode
  effect: screen.glitch
  effect: aura.expand
  reveal: "APEX: INFINITE"
}
```

The first parser prototype is exposed as `window.AURA` after `aura-language.js` loads:
`AURA.registerAura(source)`, `AURA.registerCutscene(source)`, `AURA.getAura(name)`, and `AURA.getCutscene(name)`.

**Prototype status:** this currently parses and stores language definitions as data; effect commands are not yet a full cinematic renderer, and existing game auras still use the original JavaScript registry. The next step is connecting these definitions to the roll and cutscene engines.

## Run it
Open `index.html` in a modern browser, or enable GitHub Pages for this repository using **Settings → Pages → Deploy from a branch → main → /(root)**.

## Prototype features
- Aura roll animation and rarity display
- Collection that saves in the current browser with localStorage
- Special-event aura visuals and cutscenes
- Responsive dark interface

This is a front-end demo; browser-local progress is not a secure account system.
