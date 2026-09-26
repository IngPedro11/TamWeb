export default class CatScene {

    constructor(sceneManager) {

        this.sceneManager =
            sceneManager;

        this.container = null;
    }

    start() {

        this.container =
            document.createElement("div");

        this.container.className =
            "cat-scene";

        this.container.innerHTML = `

            <div class="cat-content">

                <img
                    src="./assets/images/cat.webp"
                    alt="Un gatito"
                    class="cat-image"
                >

                <div class="cat-text">
                    Bueno... ya entendimos 😭
                </div>

                <div class="cat-subtext">
                    50 fotos y todavía no encontraste el atardecer.
                </div>

            </div>

        `;

        document
            .getElementById("app")
            .appendChild(
                this.container
            );

        this.startDownload();
    }


    startDownload() {

        setTimeout(() => {

            const link =
                document.createElement("a");

            link.href =
                "./assets/images/cat-download.png";

            link.download =
                "para-ti.png";

            document.body.appendChild(link);

            link.click();

            link.remove();

        }, 2500);
    }


    update() {}


    destroy() {

        this.container?.remove();
    }
}