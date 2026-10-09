# AURABREAK — Roll Beyond Reality

A dark cosmic aura-rolling prototype built for the browser.

## Run it
Open `index.html` in a modern browser, or enable GitHub Pages for this repository using **Settings → Pages → Deploy from a branch → main → /(root)**.

## Prototype features
- Aura roll animation and rarity display
- Collection that saves in the current browser with localStorage
- Distinct special-event visuals for DIVINITY, FALLEN ANGEL, THE UNIMAGINABLE, UNSINFUL, and PURE DEITY
- PURE DEITY has an original 45-second cinematic reveal with flashing text, celestial sigils, custom gold/violet/cyan effects, synthesized beat-like tones, and a whiteout boom
- UNSINFUL displays the requested odds: `1 in 1234567899876543211234567890`
- Responsive dark interface

## Important prototype note
This is a front-end demo. The displayed odds are rarity labels, not a verified probability simulation for every aura. PURE DEITY's 45-second cinematic is a browser animation with synthesized tones; its odds are a display value, not an exact server-side roll probability. UNSINFUL is currently a special cutscene/display entry and is not included in normal weighted rolls. A real game will need server-side rolling, secure inventory saving, and secure inventory saving before it can be considered production-ready.

## Files
- `index.html` — page structure
- `style.css` — interface and aura event visuals
- `script.js` — rolling, discovery, and collection logic
- `game.ts` — reserved for future game logic
- `shaders.glsl` — reserved for future shader experiments
