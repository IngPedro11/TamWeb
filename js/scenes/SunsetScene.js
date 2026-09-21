export default class SunsetScene {

    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.container = null;
    }

    start() {
        this.createLandscape();
        this.createTrees();
    }

    createLandscape() {
        this.container = document.createElement("div");
        this.container.className = "sunset-scene";

        this.container.innerHTML = `
            <div class="sky"></div>

            <div class="mountains-far"></div>

            <div class="mountains-near"></div>

            <div class="ground"></div>
        `;

        document
            .getElementById("app")
            .appendChild(this.container);
    }

    createTrees() {

        const ground = this.container.querySelector(".ground");

        const treePositions = [
            2, 6, 11, 17, 24,
            76, 83, 89, 94, 98
        ];

        treePositions.forEach((position, index) => {

            const tree = document.createElement("div");

            tree.className = "tree";

            tree.style.left = `${position}%`;

            const distanceFromCenter =
                Math.abs(position - 50);

            const height =
                25 + distanceFromCenter * 0.8;

            tree.style.setProperty(
                "--tree-height",
                `${height}px`
            );

            ground.appendChild(tree);
        });
    }

    destroy() {
        this.container?.remove();
    }
}