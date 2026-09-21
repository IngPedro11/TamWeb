import SceneManager from "./core/SceneManager.js";
import SunsetScene from "./scenes/SunsetScene.js";

const app = document.getElementById("app");

const sceneManager = new SceneManager(app);

sceneManager.start(
    new SunsetScene(sceneManager)
);

.tree {
    position: absolute;

    left: 0;
    bottom: 100%;

    width: 0;
    height: 0;

    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: var(--tree-height) solid var(--tree);

    transform: translateX(-50%);
}