import Sun from "../components/Sun.js";

export default class SunsetScene {

    constructor(sceneManager) {
        this.sceneManager = sceneManager;

        this.container = null;
        this.sun = null;
        this.stars = null;
    }


    start() {
        this.createLandscape();
        this.createTrees();
        this.createStars();
        this.createSun();

        this.updateEnvironment(0.5);
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

            <div class="stars"></div>
        `;

        document
            .getElementById("app")
            .appendChild(this.container);
    }


    createTrees() {

        const ground =
            this.container.querySelector(".ground");

        const treePositions = [
            2,
            6,
            11,
            17,
            24,
            76,
            83,
            89,
            94,
            98
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


    createStars() {

        this.stars =
            this.container.querySelector(
                ".stars"
            );

        const numberOfStars = 80;

        for (
            let i = 0;
            i < numberOfStars;
            i++
        ) {

            const star =
                document.createElement("div");

            star.className = "star";

            const x =
                Math.random() * 100;

            const y =
                Math.random() * 55;

            const size =
                Math.random() * 2 + 1;

            star.style.left =
                `${x}%`;

            star.style.top =
                `${y}%`;

            star.style.width =
                `${size}px`;

            star.style.height =
                `${size}px`;

            /*
             * Algunas estrellas serán
             * ligeramente más brillantes.
             */
            if (Math.random() > 0.8) {
                star.style.boxShadow =
                    "0 0 8px white";
            }

            this.stars.appendChild(star);
        }
    }


    createSun() {

        this.sun =
            new Sun(this.container);

        this.sun.onMove =
            (progress) => {

                this.updateEnvironment(
                    progress
                );
            };
    }


    updateEnvironment(progress) {

        this.updateSky(progress);

        this.updateMountains(progress);

        this.updateGround(progress);

        this.updateTrees(progress);

        this.updateStars(progress);

        this.updateSun(progress);
    }


    /* ========================================
       CIELO
    ======================================== */

    updateSky(progress) {

        const sky =
            this.container.querySelector(
                ".sky"
            );

        if (!sky) return;


        /*
         * DÍA → ATARDECER
         */

        if (progress <= 0.5) {

            const amount =
                progress / 0.5;

            const top =
                this.interpolateColor(
                    "#5fc8ff",
                    "#5c5bb7",
                    amount
                );

            const middle =
                this.interpolateColor(
                    "#8edcff",
                    "#d56c9f",
                    amount
                );

            const bottom =
                this.interpolateColor(
                    "#dff7ff",
                    "#ff9a55",
                    amount
                );

            sky.style.background = `
                linear-gradient(
                    to bottom,
                    ${top} 0%,
                    ${middle} 50%,
                    ${bottom} 100%
                )
            `;

        }

        /*
         * ATARDECER → NOCHE
         */

        else {

            const amount =
                (progress - 0.5) / 0.5;

            const top =
                this.interpolateColor(
                    "#5c5bb7",
                    "#080b2a",
                    amount
                );

            const middle =
                this.interpolateColor(
                    "#d56c9f",
                    "#121b45",
                    amount
                );

            const bottom =
                this.interpolateColor(
                    "#ff9a55",
                    "#273b70",
                    amount
                );

            sky.style.background = `
                linear-gradient(
                    to bottom,
                    ${top} 0%,
                    ${middle} 50%,
                    ${bottom} 100%
                )
            `;
        }
    }


    /* ========================================
       MONTAÑAS
    ======================================== */

    updateMountains(progress) {

        const far =
            this.container.querySelector(
                ".mountains-far"
            );

        const near =
            this.container.querySelector(
                ".mountains-near"
            );

        if (progress <= 0.5) {

            const amount =
                progress / 0.5;

            far.style.background =
                this.interpolateColor(
                    "#79a982",
                    "#9c628a",
                    amount
                );

            near.style.background =
                this.interpolateColor(
                    "#426b4b",
                    "#5c405e",
                    amount
                );

        } else {

            const amount =
                (progress - 0.5) / 0.5;

            far.style.background =
                this.interpolateColor(
                    "#9c628a",
                    "#20264d",
                    amount
                );

            near.style.background =
                this.interpolateColor(
                    "#5c405e",
                    "#10152f",
                    amount
                );
        }
    }


    /* ========================================
       TERRENO
    ======================================== */

    updateGround(progress) {

        const ground =
            this.container.querySelector(
                ".ground"
            );

        ground.style.background =
            this.interpolateColor(
                "#294632",
                "#080c17",
                progress
            );
    }


    /* ========================================
       ÁRBOLES
    ======================================== */

    updateTrees(progress) {

        const trees =
            this.container.querySelectorAll(
                ".tree"
            );

        const color =
            this.interpolateColor(
                "#193526",
                "#050810",
                progress
            );

        trees.forEach(tree => {

            tree.style.borderBottomColor =
                color;
        });
    }


    /* ========================================
       ESTRELLAS
    ======================================== */

    updateStars(progress) {

        if (!this.stars) return;

        /*
         * Hasta 0.55 no hay estrellas.
         *
         * 0.55 → empiezan
         *
         * 1.0 → cielo lleno
         */

        let opacity = 0;

        if (progress > 0.55) {

            opacity =
                (progress - 0.55) / 0.45;
        }

        opacity =
            Math.max(
                0,
                Math.min(1, opacity)
            );

        this.stars.style.opacity =
            opacity;
    }


    /* ========================================
       SOL
    ======================================== */

    updateSun(progress) {

        if (!this.sun) return;

        const sun =
            this.sun.element;


        /*
         * DÍA
         */

        if (progress < 0.25) {

            sun.classList.remove(
                "moon-mode"
            );

            sun.style.background =
                "#ffd86b";

            sun.style.boxShadow = `
                0 0 20px
                rgba(255, 220, 120, 0.5)
            `;
        }


        /*
         * ATARDECER
         */

        else if (progress < 0.35) {

            sun.classList.remove(
                "moon-mode"
            );

            const amount =
                (progress - 0.35) / 0.30;

            const color =
                this.interpolateColor(
                    "#ffba6b",
                    "#ff7043",
                    amount
                );

            sun.style.background =
                color;

            const glow =
                20 + amount * 60;

            sun.style.boxShadow = `
                0 0 ${glow}px
                rgba(252, 236, 53, 0.75)
            `;
        }


        else if (progress < 0.45) {

            sun.classList.remove(
                "moon-mode"
            );

            const amount =
                (progress - 0.35) / 0.30;

            const color =
                this.interpolateColor(
                    "#ff8e6b",
                    "#ff7043",
                    amount
                );

            sun.style.background =
                color;

            const glow =
                30 + amount * 60;

            sun.style.boxShadow = `
                0 0 ${glow}px
                rgba(250, 234, 13, 0.75)
            `;
        }


        /*
         * NOCHE
         */

        else {

            sun.classList.add(
                "moon-mode"
            );
        }
    }


    /* ========================================
       COLOR
    ======================================== */

    interpolateColor(
        color1,
        color2,
        amount
    ) {

        amount =
            Math.max(
                0,
                Math.min(1, amount)
            );

        const r1 =
            parseInt(
                color1.slice(1, 3),
                16
            );

        const g1 =
            parseInt(
                color1.slice(3, 5),
                16
            );

        const b1 =
            parseInt(
                color1.slice(5, 7),
                16
            );


        const r2 =
            parseInt(
                color2.slice(1, 3),
                16
            );

        const g2 =
            parseInt(
                color2.slice(3, 5),
                16
            );

        const b2 =
            parseInt(
                color2.slice(5, 7),
                16
            );


        const r =
            Math.round(
                r1 +
                (r2 - r1) *
                amount
            );

        const g =
            Math.round(
                g1 +
                (g2 - g1) *
                amount
            );

        const b =
            Math.round(
                b1 +
                (b2 - b1) *
                amount
            );


        return `rgb(${r}, ${g}, ${b})`;
    }


    destroy() {

        this.sun?.destroy();

        this.container?.remove();
    }
}