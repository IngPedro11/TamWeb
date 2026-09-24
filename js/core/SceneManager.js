export default class SceneManager {

    constructor(container) {
        this.container = container;
        this.currentScene = null;
    }

    start(scene) {
        this.changeTo(scene);
    }

    changeTo(scene) {

        if (this.currentScene) {
            this.currentScene.destroy();
        }

        this.currentScene = scene;

        this.currentScene.start();
    }
}