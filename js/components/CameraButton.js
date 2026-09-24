export default class CameraButton {

    constructor(container) {

        this.container = container;

        this.onCapture = null;

        this.create();
    }

    create() {

        this.element =
            document.createElement("div");

        this.element.className =
            "camera-ui";

        this.element.innerHTML = `

            <div class="camera-title">
                Toma una fotito 📸
            </div>

            <div class="camera-frame"></div>

            <button
                class="camera-shutter"
                aria-label="Tomar una foto"
            >
                <span></span>
            </button>

        `;

        this.container.appendChild(
            this.element
        );

        this.button =
            this.element.querySelector(
                ".camera-shutter"
            );

        this.button.addEventListener(
            "click",
            this.handleCapture
        );
    }

    handleCapture = () => {

        if (this.onCapture) {
            this.onCapture();
        }
    };

    destroy() {

        this.button?.removeEventListener(
            "click",
            this.handleCapture
        );

        this.element?.remove();
    }
}