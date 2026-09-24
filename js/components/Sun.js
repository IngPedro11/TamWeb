export default class Sun {
constructor(container) {
    console.log("☀️ SUN: constructor");

    this.container = container;

    this.element = document.createElement("div");
    this.element.className = "sun";

    this.container.appendChild(this.element);

    this.progress = 0.01;
    this.onMove = null;

    this.isDragging = false;

    this.setupEvents();
    this.updatePosition();
}

    setupEvents() {
        this.element.addEventListener(
            "pointerdown",
            this.handlePointerDown
        );

        window.addEventListener(
            "pointermove",
            this.handlePointerMove
        );

        window.addEventListener(
            "pointerup",
            this.handlePointerUp
        );
    }

    handlePointerDown = (event) => {
        console.log("☀️ SUN: pointerdown");

        event.preventDefault();

        this.isDragging = true;
    };

    handlePointerMove = (event) => {
        if (!this.isDragging) {
            return;
        }

        const width = window.innerWidth;

        let progress = event.clientX / width;

        progress = Math.max(
            0,
            Math.min(1, progress)
        );

        this.progress = progress;

        this.updatePosition();

        if (this.onMove) {
            console.log("SUN PROGRESS:", this.progress);
            this.onMove(this.progress);
        }
    };

    handlePointerUp = () => {
        this.isDragging = false;
    };

    updatePosition() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const x = this.progress * width;

        /*
         * 0   = arriba
         * 0.5 = abajo
         * 1   = arriba
         */
        const curve =
            Math.sin(this.progress * Math.PI);

        const highY = height * 0.30;
        const lowY = height * 0.51;

        const y =
            highY + curve * (lowY - highY);

        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    destroy() {
        this.element.remove();

        window.removeEventListener(
            "pointermove",
            this.handlePointerMove
        );

        window.removeEventListener(
            "pointerup",
            this.handlePointerUp
        );
    }
}