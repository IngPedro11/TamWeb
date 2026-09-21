import SceneManager from "./core/SceneManager.js";
import SunsetScene from "./scenes/SunsetScene.js";

const app = document.getElementById("app");

const sceneManager = new SceneManager(app);

sceneManager.start(
    new SunsetScene(sceneManager)
);

