export default class CameraButton {

    constructor(container) {

        this.container = container;

        this.onCapture = null;

        this.messageTimer = null;

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

            <div class="camera-message"></div>

            <button
                class="camera-shutter"
                aria-label="Tomar una foto"
                type="button"
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

        this.message =
            this.element.querySelector(
                ".camera-message"
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

    flash(type = "white") {

        const flash =
            document.createElement("div");

        flash.className =
            `camera-flash ${type}`;

        this.element.appendChild(
            flash
        );

        requestAnimationFrame(() => {

            flash.classList.add(
                "active"
            );

        });

        setTimeout(() => {

            flash.remove();

        }, 450);
    }

    showMessage(text) {

        clearTimeout(
            this.messageTimer
        );

        this.message.textContent =
            text;

        this.message.classList.remove(
            "show"
        );

        requestAnimationFrame(() => {

            this.message.classList.add(
                "show"
            );

        });

        this.messageTimer =
            setTimeout(() => {

                this.message.classList.remove(
                    "show"
                );

            }, 2800);
    }

    destroy() {

        clearTimeout(
            this.messageTimer
        );

        this.button?.removeEventListener(
            "click",
            this.handleCapture
        );

        this.element?.remove();
    }
}

