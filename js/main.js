import SceneManager from "./core/SceneManager.js";
import MemoryManager from "./core/MemoryManager.js";
import SunsetScene from "./scenes/SunsetScene.js";

console.log("A - Módulos importados");

const app =
    document.getElementById("app");

console.log("B - App encontrada", app);

const sceneManager =
    new SceneManager(app);

console.log("C - SceneManager creado");

const memoryManager =
    new MemoryManager();

console.log("D - MemoryManager creado");

const scene =
    new SunsetScene(
        sceneManager,
        memoryManager
    );

console.log("E - SunsetScene creado");

sceneManager.start(scene);

console.log("F - Escena iniciada");