(() => {
"use strict";
const $ = id => document.getElementById(id);
const groups = {
general: "General-purpose", web: "Web, markup & styling", data: "Data & query",
systems: "Systems & hardware", functional: "Functional & logic",
esoteric: "Esoteric & experimental", other: "Other / specialist"
};
const entries = [
["A+","general"],["ABAP","general"],["ActionScript","web"],["Ada","systems"],["Agda","functional"],["ALGOL","general"],["Alice","other"],["Apex","general"],["APL","general"],["AppleScript","other"],["Assembly","systems"],["AutoHotkey","other"],["AutoIt","other"],["Awk","other"],
["B","general"],["BASIC","general"],["Bash","other"],["Batch scripting","other"],["bc","other"],["Befunge","esoteric"],["Bicep","other"],["Boo","general"],["Brainfuck","esoteric"],
["C","systems"],["C++","systems"],["C#","general"],["Caché ObjectScript","general"],["Chapel","systems"],["ChucK","other"],["Clojure","functional"],["COBOL","general"],["CoffeeScript","web"],["Common Lisp","functional"],["Crystal","general"],["CSS","web"],
["D","systems"],["Dafny","other"],["Dart","general"],["Delphi","general"],["Dylan","functional"],
["Eiffel","general"],["Elixir","functional"],["Elm","functional"],["Emacs Lisp","functional"],["Erlang","functional"],["Euphoria","general"],["Excel VBA","other"],
["Factor","functional"],["F#","functional"],["F*","functional"],["Fantom","general"],["Fish","other"],["Forth","systems"],["Fortran","systems"],["FreeBASIC","general"],
["GAMS","data"],["GDScript","general"],["Gleam","functional"],["GLSL","systems"],["Go","systems"],["Gosu","general"],["GraphQL","data"],
["Hack","web"],["Harbour","general"],["Haskell","functional"],["Haxe","general"],["HCL","other"],["HTML","web"],
["Icon","general"],["Idris","functional"],["Inform","other"],["Io","general"],["ISLISP","functional"],
["J","general"],["Janet","functional"],["Java","general"],["JavaScript","web"],["JCL","other"],["JScript","web"],["Julia","general"],
["Kaleidoscope","other"],["K","general"],["Karel","other"],["Kotlin","general"],
["LabVIEW","other"],["Ladder Logic","systems"],["Lean","functional"],["Limbo","systems"],["Lisp","functional"],["LiveCode","general"],["Logo","other"],["Lua","general"],
["M","other"],["Maple","other"],["MATLAB","other"],["Mercury","functional"],["Mesa","systems"],["Modula-2","systems"],["Modula-3","systems"],["Mojo","general"],["Monkey C","other"],["MoonScript","web"],
["NASM","systems"],["Neko","general"],["nesC","systems"],["NetLogo","other"],["Nim","general"],["Nix","other"],
["Oberon","systems"],["Objective-C","systems"],["OCaml","functional"],["Octave","other"],["Odin","systems"],["Opa","web"],["OpenCL","systems"],["OpenEdge ABL","general"],
["Pascal","general"],["Perl","other"],["PHP","web"],["PL/I","general"],["PL/SQL","data"],["Pony","functional"],["PostScript","other"],["PowerShell","other"],["Processing","other"],["Prolog","functional"],["PureScript","functional"],["Python","general"],
["Q","data"],["Q#","other"],["QML","web"],["QuakeC","other"],["क्व (Q language)","other"],
["R","other"],["Racket","functional"],["Raku","general"],["Reason","functional"],["Red","general"],["ReScript","web"],["Rexx","other"],["Ring","general"],["Roc","functional"],["Ruby","general"],["Rust","systems"],
["SAS","data"],["Scala","functional"],["Scheme","functional"],["Scratch","other"],["Smalltalk","functional"],["Solidity","other"],["SPARK","systems"],["SQL","data"],["Standard ML","functional"],["Stata","data"],["SuperCollider","other"],["Svelte (framework)","web"],
["Tcl","other"],["Terra","systems"],["Thrift","data"],["Turing","general"],["TypeScript","web"],
["UnrealScript","other"],["Unicon","general"],["URSA","other"],
["V","systems"],["Vala","general"],["VB.NET","general"],["VBA","other"],["Verilog","systems"],["VHDL","systems"],["Vim script","other"],["Vyper","other"],
["WebAssembly (Wasm)","systems"],["Wolfram Language","other"],["Wren","general"],
["X++","general"],["X10","systems"],["XBase","general"],["XQuery","data"],["Xtend","general"],
["Yorick","other"],["YQL","data"],
["Z notation","other"],["Zig","systems"],["ZPL","other"],["Zsh","other"],
["XML","web"],["SVG","web"],["HLSL","systems"],["WGSL","systems"],["SystemVerilog","systems"],["SPARQL","data"],["INTERCAL","esoteric"],["Malbolge","esoteric"],["Whitespace","esoteric"],["Simula","general"],["SNOBOL","general"],["BCPL","systems"],["PL/360","systems"]
];
const examples = [
{name:"JavaScript",note:"This is the kind of code the browser can run directly for the live game.",code:`const auras = ["DUST", "EMBER", "TIDAL", "STATIC"];
const result = auras[Math.floor(Math.random() * auras.length)];
console.log("Discovery:", result);`},
{name:"Python",note:"A simple learning example. A browser needs a Python runtime to execute Python.",code:`import random

auras = ["DUST", "EMBER", "TIDAL", "STATIC"]
result = random.choice(auras)
print("Discovery:", result)`},
{name:"TypeScript",note:"TypeScript adds types and is normally compiled to JavaScript before browser execution.",code:`const auras: string[] = ["DUST", "EMBER", "TIDAL", "STATIC"];
const result: string = auras[Math.floor(Math.random() * auras.length)];
console.log("Discovery:", result);`},
{name:"C++",note:"Native C++ requires a compiler; it does not run directly as ordinary browser JavaScript.",code:`#include <iostream>
#include <array>
#include <random>

int main() {
  std::array<const char*, 4> auras = {"DUST", "EMBER", "TIDAL", "STATIC"};
  std::mt19937 rng(std::random_device{}());
  std::cout << "Discovery: " << auras[rng() % auras.size()] << "\\n";
}`},
{name:"Rust",note:"Rust is suitable for reliable systems code; WebAssembly can bridge some Rust code to browsers.",code:`fn main() {
    let auras = ["DUST", "EMBER", "TIDAL", "STATIC"];
    let index = 2; // Example choice
    println!("Discovery: {}", auras[index]);
}`},
{name:"Go",note:"Go is often useful for backend services and APIs rather than browser UI code.",code:`package main

import "fmt"

func main() {
    auras := []string{"DUST", "EMBER", "TIDAL", "STATIC"}
    fmt.Println("Discovery:", auras[2])
}`},
{name:"SQL",note:"SQL queries saved game data; use a trusted backend and row-level security for player data.",code:`SELECT aura_name, odds
FROM aura_discoveries
WHERE player_id = :current_player
ORDER BY discovered_at DESC
LIMIT 10;`},
{name:"GLSL",note:"GLSL shaders can power GPU visuals. This is a fragment-shader starter, not a complete renderer.",code:`precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float pulse = 0.5 + 0.5 * sin(u_time + uv.x * 8.0);
  gl_FragColor = vec4(0.35, 0.2 + pulse * 0.3, 0.95, 1.0);
}`}
];
let activeExample = 0;
function renderCatalog() {
  const query = $("languageSearch").value.trim().toLowerCase();
  const category = $("categoryFilter").value;
  const matches = entries.filter(([name, group]) =>
    name.toLowerCase().includes(query) && (category === "all" || group === category));
  $("languageCatalog").replaceChildren();
  const fragment = document.createDocumentFragment();
  for (const [name, group] of matches) {
    const card = document.createElement("article");
    card.className = "language-card";
    const letter = document.createElement("span");
    letter.className = "language-letter";
    letter.textContent = name[0].toUpperCase();
    const info = document.createElement("div");
    info.className = "language-info";
    const title = document.createElement("div");
    title.className = "language-name";
    title.textContent = name;
    const categoryLabel = document.createElement("div");
    categoryLabel.className = "language-category";
    categoryLabel.textContent = groups[group];
    info.append(title, categoryLabel);
    card.append(letter, info);
    fragment.append(card);
  }
  $("languageCatalog").append(fragment);
  $("visibleCount").textContent = matches.length;
  $("emptyState").hidden = matches.length > 0;
}
function renderExample(index) {
  activeExample = index;
  const example = examples[index];
  $("codeLanguage").textContent = example.name;
  $("codeSample").textContent = example.code;
  $("codeNote").textContent = example.note;
  $("exampleTabs").querySelectorAll("button").forEach((button, i) => {
    button.classList.toggle("active", i === index);
    button.setAttribute("aria-selected", String(i === index));
  });
}
function initExamples() {
  const tabs = $("exampleTabs");
  examples.forEach((example, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "example-tab";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", "false");
    button.textContent = example.name;
    button.addEventListener("click", () => renderExample(index));
    tabs.append(button);
  });
  renderExample(0);
}
$("languageSearch").addEventListener("input", renderCatalog);
$("categoryFilter").addEventListener("change", renderCatalog);
$("copyCode").addEventListener("click", async () => {
  const code = examples[activeExample].code;
  try {
    await navigator.clipboard.writeText(code);
    showToast("CODE COPIED");
  } catch {
    const area = document.createElement("textarea");
    area.value = code;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    showToast(ok ? "CODE COPIED" : "COPY FAILED — SELECT THE CODE");
  }
});
let toastTimer;
function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}
$("languageTotal").textContent = entries.length;
renderCatalog();
initExamples();
})();