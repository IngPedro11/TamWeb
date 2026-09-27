
export default class MemoryManager {

    constructor() {
        this.memory = {
            sunset: null,
            sunsetImage: null,
            timestamp: null
        };
    }

    saveSunset(data) {
        this.memory.sunset = {
            ...data
        };

        this.memory.timestamp =
            new Date().toISOString();
    }

    saveSunsetImage(imageData) {
        this.memory.sunsetImage =
            imageData;
    }

    getSunset() {
        return this.memory.sunset;
    }

    getSunsetImage() {
        return this.memory.sunsetImage;
    }

    getMemory() {
        return {
            ...this.memory
        };
    }

    clear() {
        this.memory = {
            sunset: null,
            sunsetImage: null,
            timestamp: null
        };
    }
}

