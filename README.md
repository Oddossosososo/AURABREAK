# AURABREAK — Roll Beyond Reality

A dark cosmic aura-rolling prototype. This is an early browser demo, not the finished Roblox game.

## Run it
Open `index.html` in a modern browser, or enable GitHub Pages for this repository using **Settings → Pages → Deploy from a branch → main → /(root)**.

## Prototype features
- Aura roll animation and rarity display
- Collection that saves in the current browser with localStorage
- Distinct special-event visuals for DIVINITY, FALLEN ANGEL, THE UNIMAGINABLE, and UNSINFUL
- UNSINFUL displays the requested odds: `1 in 1234567899876543211234567890`
- Responsive dark interface

## Important prototype note
This is a front-end demo. The displayed odds are rarity labels, not a verified probability simulation for every aura. UNSINFUL is currently a special cutscene/display entry and is not included in normal weighted rolls. A real game will need server-side rolling, secure inventory saving, and a proper Roblox implementation before it can be considered production-ready.

## Files
- `index.html` — page structure
- `style.css` — interface and aura event visuals
- `script.js` — rolling, discovery, and collection logic
- `game.ts` — reserved for future game logic
- `shaders.glsl` — reserved for future shader experiments
