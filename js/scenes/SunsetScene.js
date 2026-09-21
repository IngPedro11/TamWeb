export default class SunsetScene {

    constructor(sceneManager) {
        this.sceneManager = sceneManager;
    }

    start() {
        this.createLandscape();
        this.createSun();
        this.createStars();
        this.setupInteraction();
    }

    createLandscape() {
        // cielo
        // montañas
        // árboles
        // tierra
    }

    createSun() {
        // crear sol
    }

    createStars() {
        // crear estrellas
    }

    setupInteraction() {
        // arrastrar sol
    }

    update() {
        // calcular posición
        // actualizar colores
        // actualizar estrellas
        // actualizar sol
    }

    destroy() {
        // limpiar todo
    }
}