export default class FlowerScene {

    constructor(sceneManager) {

        this.sceneManager =
            sceneManager;

        this.container = null;
    }


    start() {

        this.container =
            document.createElement("div");

        this.container.className =
            "flower-scene";

        this.container.innerHTML = `

            <div class="flower-placeholder">

                <img src="../assets/images/cat.webp"></img>

                <div class="flower-text">
                </div>

            </div>

        `;

        document
            .getElementById("app")
            .appendChild(
                this.container
            );
    }


    update() {
        // Aquí construiremos
        // la animación de la flor.
    }


    destroy() {

        this.container?.remove();
    }
}

