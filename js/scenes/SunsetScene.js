import Sun from "../components/Sun.js";

export default class SunsetScene {

    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.container = null;
        this.sun = null;
    }

    start() {
        this.createLandscape();
        this.createTrees();
        this.createSun();
    }

    createLandscape() {
        this.container =
            document.createElement("div");

        this.container.className =
            "sunset-scene";

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
        const ground =
            this.container.querySelector(".ground");

        const treePositions = [
            2, 6, 11, 17, 24,
            76, 83, 89, 94, 98
        ];

        treePositions.forEach((position) => {

            const tree =
                document.createElement("div");

            tree.className = "tree";

            tree.style.left =
                `${position}%`;

            const distanceFromCenter =
                Math.abs(position - 50);

            const height =
                25 +
                distanceFromCenter * 0.8;

            tree.style.setProperty(
                "--tree-height",
                `${height}px`
            );

            ground.appendChild(tree);
        });
    }

    createSun() {

        console.log("🌅 CREATING SUN");

        this.sun =
            new Sun(this.container);

        this.sun.onMove =
            (progress) => {

                console.log(
                    "🌅 ENVIRONMENT:",
                    progress
                );

                this.updateEnvironment(
                    progress
                );
            };
    }

    updateEnvironment(progress) {
        this.updateSky(progress);
    }

    updateSky(progress) {

        const sky =
            this.container.querySelector(".sky");

        const dayTop = "#65c9ff";
        const dayBottom = "#dff6ff";

        const sunsetTop = "#8b6fd8";
        const sunsetBottom = "#ff8a65";

        const nightTop = "#080b24";
        const nightBottom = "#18264f";

        let topColor;
        let bottomColor;

        if (progress < 0.5) {

            const t =
                progress / 0.5;

            topColor =
                this.interpolateColor(
                    dayTop,
                    sunsetTop,
                    t
                );

            bottomColor =
                this.interpolateColor(
                    dayBottom,
                    sunsetBottom,
                    t
                );

        } else {

            const t =
                (progress - 0.5) / 0.5;

            topColor =
                this.interpolateColor(
                    sunsetTop,
                    nightTop,
                    t
                );

            bottomColor =
                this.interpolateColor(
                    sunsetBottom,
                    nightBottom,
                    t
                );
        }

        sky.style.background = `
            linear-gradient(
                to bottom,
                ${topColor},
                ${bottomColor}
            )
        `;
    }

    interpolateColor(
        color1,
        color2,
        amount
    ) {

        const hexToRgb = (hex) => {

            const value =
                hex.replace("#", "");

            return {
                r: parseInt(
                    value.substring(0, 2),
                    16
                ),

                g: parseInt(
                    value.substring(2, 4),
                    16
                ),

                b: parseInt(
                    value.substring(4, 6),
                    16
                )
            };
        };

        const rgbToHex = (rgb) => {

            return "#" + [
                rgb.r,
                rgb.g,
                rgb.b
            ]
                .map(value =>
                    Math.round(value)
                        .toString(16)
                        .padStart(2, "0")
                )
                .join("");
        };

        const a =
            hexToRgb(color1);

        const b =
            hexToRgb(color2);

        return rgbToHex({
            r:
                a.r +
                (b.r - a.r) *
                amount,

            g:
                a.g +
                (b.g - a.g) *
                amount,

            b:
                a.b +
                (b.b - a.b) *
                amount
        });
    }

    destroy() {

        this.sun?.destroy();

        this.container?.remove();
    }
}