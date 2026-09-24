import Sun from "../components/Sun.js";
import CameraButton from "../components/CameraButton.js";

export default class SunsetScene {

    constructor(sceneManager) {

        this.sceneManager = sceneManager;

        this.container = null;

        this.sun = null;

        this.stars = null;
    }


    /* ========================================
       START
    ======================================== */

    start() {

        this.createLandscape();
        this.createTrees();
        this.createStars();
        this.createSun();
        this.createCamera();

        this.updateEnvironment(0.01);
    }
    /* ========================================
       Camera
    ======================================== */


    createCamera() {

    this.camera =
        new CameraButton(
            this.container
        );

    this.camera.onCapture =
        () => {

            console.log(
                "📸 Foto!"
            );

        };
}


    /* ========================================
       LANDSCAPE
    ======================================== */

    createLandscape() {

        this.container =
            document.createElement("div");

        this.container.className =
            "sunset-scene";


        this.container.innerHTML = `

            <div class="sky"></div>

            <div class="horizon-glow"></div>

            <div class="mountains-far"></div>

            <div class="mountains-near"></div>

            <div class="ground"></div>

            <div class="stars"></div>
        `;


        document
            .getElementById("app")
            .appendChild(
                this.container
            );
    }


    /* ========================================
       TREES
    ======================================== */

    createTrees() {

        const ground =
            this.container
                .querySelector(".ground");


        /*
         * Más árboles hacia los lados.
         *
         * El centro queda más abierto
         * para que el atardecer tenga
         * espacio visual.
         */

        const positions = [

            2,
            5,
            9,
            14,
            19,
            24,

            76,
            81,
            86,
            91,
            95,
            98
        ];


        positions.forEach(
            (position, index) => {

                const tree =
                    document.createElement(
                        "div"
                    );


                tree.className =
                    "tree";


                tree.style.left =
                    `${position}%`;


                /*
                 * Distancia al centro.
                 */

                const distance =
                    Math.abs(
                        position - 50
                    );


                /*
                 * Árboles más grandes
                 * hacia los extremos.
                 */

                const height =
                    35 +
                    distance * 1.2;


                const width =
                    8 +
                    distance * 0.12;


                tree.style.setProperty(
                    "--tree-height",
                    `${height}px`
                );


                tree.style.setProperty(
                    "--tree-width",
                    `${width}px`
                );


                ground.appendChild(
                    tree
                );
            }
        );
    }


    /* ========================================
       ESTRELLAS
    ======================================== */

    createStars() {

        this.stars =
            this.container
                .querySelector(".stars");


        /*
         * Usamos posiciones
         * pseudo-aleatorias pero
         * determinadas.
         */

        const stars = [

            [8, 12],
            [14, 23],
            [20, 8],
            [27, 18],
            [33, 11],
            [39, 25],

            [46, 7],
            [52, 18],
            [58, 10],
            [64, 24],

            [71, 8],
            [77, 17],
            [83, 11],
            [89, 25],
            [95, 9],

            [12, 34],
            [25, 39],
            [37, 33],
            [49, 37],
            [62, 34],
            [74, 40],
            [87, 35]
        ];


        stars.forEach(
            ([x, y], index) => {

                const star =
                    document.createElement(
                        "div"
                    );


                star.className =
                    "star";


                star.style.left =
                    `${x}%`;


                star.style.top =
                    `${y}%`;


                const size =
                    index % 5 === 0
                        ? 3
                        : 1.5;


                star.style.width =
                    `${size}px`;


                star.style.height =
                    `${size}px`;


                star.style.setProperty(
                    "--twinkle-duration",
                    `${2 + (index % 4)}s`
                );


                star.style.setProperty(
                    "--twinkle-delay",
                    `${-(index % 5)}s`
                );


                this.stars.appendChild(
                    star
                );
            }
        );
    }


    /* ========================================
       SUN
    ======================================== */

    createSun() {

        this.sun =
            new Sun(
                this.container
            );


        this.sun.onMove =
            (progress) => {

                this.updateEnvironment(
                    progress
                );
            };
    }


    /* ========================================
       UPDATE GLOBAL
    ======================================== */

    updateEnvironment(progress) {

        this.updateSky(
            progress
        );

        this.updateHorizonGlow(
            progress
        );

        this.updateMountains(
            progress
        );

        this.updateGround(
            progress
        );

        this.updateTrees(
            progress
        );

        this.updateStars(
            progress
        );

        this.updateSun(
            progress
        );
    }


    /* ========================================
       SKY
    ======================================== */

    updateSky(progress) {

        const sky =
            this.container
                .querySelector(".sky");


        if (progress <= 0.5) {

            const amount =
                progress / 0.5;


            const top =
                this.interpolateColor(
                    "#58c7ff",
                    "#5553aa",
                    amount
                );


            const middle =
                this.interpolateColor(
                    "#8bdcff",
                    "#c76a9f",
                    amount
                );


            const bottom =
                this.interpolateColor(
                    "#dff7ff",
                    "#ff9857",
                    amount
                );


            sky.style.background = `
                linear-gradient(
                    to bottom,
                    ${top} 0%,
                    ${middle} 48%,
                    ${bottom} 100%
                )
            `;

        } else {

            const amount =
                (progress - 0.5) / 0.5;


            const top =
                this.interpolateColor(
                    "#5553aa",
                    "#070a25",
                    amount
                );


            const middle =
                this.interpolateColor(
                    "#c76a9f",
                    "#111a40",
                    amount
                );


            const bottom =
                this.interpolateColor(
                    "#ff9857",
                    "#293d72",
                    amount
                );


            sky.style.background = `
                linear-gradient(
                    to bottom,
                    ${top} 0%,
                    ${middle} 48%,
                    ${bottom} 100%
                )
            `;
        }
    }


    /* ========================================
       HORIZON GLOW
    ======================================== */

    updateHorizonGlow(progress) {

        const glow =
            this.container
                .querySelector(
                    ".horizon-glow"
                );


        /*
         * El glow aparece principalmente
         * alrededor del atardecer.
         */

        const distance =
            Math.abs(
                progress - 0.5
            );


        let intensity =
            1 - distance * 5;


        intensity =
            Math.max(
                0,
                Math.min(
                    1,
                    intensity
                )
            );


        glow.style.opacity =
            intensity;
    }


    /* ========================================
       MOUNTAINS
    ======================================== */

    updateMountains(progress) {

        const far =
            this.container
                .querySelector(
                    ".mountains-far"
                );


        const near =
            this.container
                .querySelector(
                    ".mountains-near"
                );


        if (progress <= 0.5) {

            const amount =
                progress / 0.5;


            far.style.background =
                this.interpolateColor(
                    "#79a982",
                    "#996487",
                    amount
                );


            near.style.background =
                this.interpolateColor(
                    "#426b4b",
                    "#59405d",
                    amount
                );

        } else {

            const amount =
                (progress - 0.5) / 0.5;


            far.style.background =
                this.interpolateColor(
                    "#996487",
                    "#22284d",
                    amount
                );


            near.style.background =
                this.interpolateColor(
                    "#59405d",
                    "#10152e",
                    amount
                );
        }
    }


    /* ========================================
       GROUND
    ======================================== */

    updateGround(progress) {

        const ground =
            this.container
                .querySelector(
                    ".ground"
                );


        ground.style.background =
            this.interpolateColor(
                "#193526",
                "#04070d",
                progress
            );
    }


    /* ========================================
       TREES
    ======================================== */

    updateTrees(progress) {

        const trees =
            this.container
                .querySelectorAll(
                    ".tree"
                );


        const color =
            this.interpolateColor(
                "#193526",
                "#04070d",
                progress
            );


        trees.forEach(
            tree => {

                tree.style
                    .borderBottomColor =
                    color;
            }
        );
    }


    /* ========================================
       STARS
    ======================================== */

    updateStars(progress) {

        if (!this.stars) return;


        /*
         * Comienzan a aparecer
         * justo después del atardecer.
         */

        let opacity = 0;


        if (progress > 0.52) {

            opacity =
                (progress - 0.52)
                / 0.48;
        }


        opacity =
            Math.max(
                0,
                Math.min(
                    1,
                    opacity
                )
            );


        this.stars.style.opacity =
            opacity;
    }


    /* ========================================
       SUN
    ======================================== */

updateSun(progress) {

    if (!this.sun) return;

    const sun = this.sun.element;

    /*
     * ========================================
     * DÍA
     * ========================================
     */

    if (progress < 0.32) {

        const amount =
            progress / 0.32;

        sun.classList.remove("moon-mode");

        sun.style.background =
            this.interpolateColor(
                "#ffd86b",
                "#ffb347",
                amount
            );

        sun.style.width = "64px";
        sun.style.height = "64px";

        sun.style.boxShadow = `
            0 0 25px
            rgba(255, 220, 120, 0.55)
        `;
    }

    /*
     * ========================================
     * ATARDECER
     * ========================================
     */

    else if (progress < 0.58) {

        const amount =
            (progress - 0.32) / 0.26;

        sun.classList.remove("moon-mode");

        sun.style.background =
            this.interpolateColor(
                "#ffb347",
                "#ff7043",
                amount
            );

        /*
         * El sol crece ligeramente
         * durante el atardecer.
         */
        const size =
            64 + amount * 10;

        sun.style.width =
            `${size}px`;

        sun.style.height =
            `${size}px`;

        const glow =
            25 + amount * 70;

        sun.style.boxShadow = `
            0 0 ${glow}px
            rgba(255, 130, 70, 0.75)
        `;
    }

    /*
     * ========================================
     * SOL → LUNA
     * ========================================
     */

    else if (progress < 0.82) {

        const amount =
            (progress - 0.58) / 0.24;

        sun.classList.remove("moon-mode");

        /*
         * Primero rojo → dorado.
         */
        let color;

        if (amount < 0.45) {

            const localAmount =
                amount / 0.45;

            color =
                this.interpolateColor(
                    "#ff7043",
                    "#e9b477",
                    localAmount
                );

        }

        /*
         * Después dorado → blanco lunar.
         */
        else {

            const localAmount =
                (amount - 0.45) / 0.55;

            color =
                this.interpolateColor(
                    "#e9b477",
                    "#f4f1d0",
                    localAmount
                );
        }

        sun.style.background =
            color;

        /*
         * Aquí mantenemos el detalle
         * que te gustó:
         *
         * 74px → 58px
         */
        const size =
            74 - amount * 16;

        sun.style.width =
            `${size}px`;

        sun.style.height =
            `${size}px`;

        /*
         * El brillo naranja desaparece
         * mientras aparece el brillo lunar.
         */
        const orangeOpacity =
            1 - amount;

        const orangeGlow =
            70 * orangeOpacity;

        const moonOpacity =
            amount;

        const moonGlow =
            15 + amount * 30;

        sun.style.boxShadow = `
            0 0 ${orangeGlow}px
            rgba(
                255,
                120,
                60,
                ${orangeOpacity}
            ),

            0 0 ${moonGlow}px
            rgba(
                255,
                255,
                220,
                ${moonOpacity}
            )
        `;
    }

    /*
     * ========================================
     * LUNA
     * ========================================
     */

    else {

        const amount =
            (progress - 0.82) / 0.18;

        sun.classList.add("moon-mode");

        /*
         * La luna termina ligeramente
         * más pequeña que el sol.
         */
        const size =
            58 - amount * 4;

        sun.style.width =
            `${size}px`;

        sun.style.height =
            `${size}px`;

        const glow =
            40 + amount * 20;

        sun.style.boxShadow = `
            0 0 ${glow}px
            rgba(
                255,
                255,
                220,
                0.55
            ),

            0 0 ${glow * 2}px
            rgba(
                180,
                200,
                255,
                0.18
            )
        `;
    }
}


    /* ========================================
       COLOR INTERPOLATION
    ======================================== */

    interpolateColor(
        color1,
        color2,
        amount
    ) {

        amount =
            Math.max(
                0,
                Math.min(
                    1,
                    amount
                )
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


    /* ========================================
       DESTROY
    ======================================== */

    destroy() {

        this.sun?.destroy();
        this.camera?.destroy();

        this.container?.remove();
    }
}