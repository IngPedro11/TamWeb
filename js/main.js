console.log("A - MAIN");

import SceneManager from "./core/SceneManager.js";

console.log("B - SceneManager importado");

import SunsetScene from "./scenes/SunsetScene.js";

console.log("C - SunsetScene importado");

const app = document.getElementById("app");

console.log("D - App encontrada", app);

const sceneManager = new SceneManager(app);

console.log("E - SceneManager creado");

const scene = new SunsetScene(sceneManager);

console.log("F - SunsetScene creado");

sceneManager.start(scene);

console.log("G - Scene iniciado");