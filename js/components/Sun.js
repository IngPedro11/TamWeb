export default class Sun {
    constructor(container) {
        this.container = container;

        this.element = document.createElement("div");
        this.element.className = "sun";

        container.appendChild(this.element);
    }

    setPosition(x, y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }

    destroy() {
        this.element.remove();
    }
}