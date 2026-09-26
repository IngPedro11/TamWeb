export default class FlowerScene {

    constructor(sceneManager) {

        this.sceneManager =
            sceneManager;

        this.container = null;

        this.fallingPetalInterval = null;

        this.PETAL_LAYERS = [

            { count: 4, w: 24, h: 46, curl: 78, delayBase: 0, tz: 2, cls: "petal-bud" },
            { count: 5, w: 34, h: 58, curl: 65, delayBase: 0.25, tz: 9, cls: "petal-core" },
            { count: 6, w: 46, h: 72, curl: 48, delayBase: 0.55, tz: 18, cls: "petal-inner" },
            { count: 7, w: 58, h: 88, curl: 22, delayBase: 0.90, tz: 30, cls: "petal-mid-inner" },
            { count: 8, w: 72, h: 104, curl: -5, delayBase: 1.30, tz: 44, cls: "petal-mid" },
            { count: 9, w: 86, h: 118, curl: -25, delayBase: 1.75, tz: 60, cls: "petal-outer" },
            { count: 10, w: 98, h: 130, curl: -48, delayBase: 2.25, tz: 76, cls: "petal-blush" }
        ];

        this.SEPALS_COUNT = 5;

        this.FALLING_PETAL_COLORS = [
            ["#9a001d", "#3d0008"],
            ["#850018", "#2b0005"],
            ["#ad0022", "#480008"],
            ["#bf0028", "#52000c"]
        ];
    }


    start() {

        this.createScene();

        this.createSepals();

        this.createPetals();

        this.setupButton();
    }


    /*
     * ¡IMPORTANTE!
     * Este markup usa las mismas clases/IDs que el CSS
     * "bueno" (glass-card, trigger-overlay, scene, rose-wrapper...),
     * NO las clases flower-* del CSS bugeado.
     */
    createScene() {

        this.container =
            document.createElement("div");

        this.container.className =
            "rose-scene-root";

        this.container.innerHTML = `

            <div class="vignette"></div>

            <div class="spotlight"></div>

            <div
                class="ambient-light"
                id="ambientLight"
            ></div>


            <div
                class="trigger-overlay"
                id="triggerOverlay"
            >

                <div class="glass-card">

                    <div class="card-glow"></div>

                    <div class="rose-icon">
                        🌹
                    </div>

                    <h2 class="title">
                        Algo para ti
                    </h2>

                    <div class="loading-bar-container">

                        <div
                            class="loading-bar"
                            id="loadingBar"
                        ></div>

                    </div>

                    <p
                        class="status-text"
                        id="statusText"
                    >
                        Preparando algo especial...
                    </p>

                    <button
                        class="start-button"
                        id="startButton"
                        disabled
                    >
                        <span class="btn-text">
                            Ver sorpresa 
                        </span>
                        <span class="btn-shine"></span>
                    </button>

                </div>

            </div>


            <div class="scene">

                <div
                    class="rose-wrapper"
                    id="roseWrapper"
                >

                    <div class="stem-group">

                        <div
                            class="stem"
                            id="stem"
                        >

                            <div class="stem-highlight"></div>

                        </div>


                        <div class="thorn thorn-1" id="thorn1"></div>
                        <div class="thorn thorn-2" id="thorn2"></div>


                        <div
                            class="leaf leaf-left"
                            id="leafLeft"
                        >

                            <div class="leaf-vein"></div>

                        </div>


                        <div
                            class="leaf leaf-right"
                            id="leafRight"
                        >

                            <div class="leaf-vein"></div>

                        </div>

                    </div>


                    <div
                        class="calyx"
                        id="calyx"
                    ></div>


                    <div
                        class="rose-head"
                        id="roseHead"
                    >

                        <div class="rose-glow"></div>

                        <div class="rose-glow-inner"></div>

                    </div>

                </div>

            </div>


            <div
                class="end-text"
                id="endText"
            >

                <p class="tagline" id="tagline">
                    i coded this for you
                </p>

                <span class="rose-emoji">
                    🌹
                </span>

            </div>


            <div id="fallingPetals"></div>

        `;

        document
            .getElementById("app")
            .appendChild(
                this.container
            );
    }


    setupButton() {

        const button =
            this.container.querySelector(
                "#startButton"
            );

        const overlay =
            this.container.querySelector(
                "#triggerOverlay"
            );

        const loadingBar =
            this.container.querySelector(
                "#loadingBar"
            );

        const statusText =
            this.container.querySelector(
                "#statusText"
            );


        const duration = 2400;

        const steps = [

            { threshold: 20, text: "Preparando la sorpresa..." },
            { threshold: 50, text: "Plantando una pequeña flor..." },
            { threshold: 80, text: "Preparando los pétalos..." },
            { threshold: 95, text: "Casi lista..." },
            { threshold: 100, text: "Lista para florecer 🌹" }
        ];


        let startTime = null;


        const animateLoader =
            (timestamp) => {

                if (!startTime) {
                    startTime = timestamp;
                }

                const progress =
                    Math.min(
                        (timestamp - startTime)
                        / duration,
                        1
                    );


                const percent =
                    Math.floor(
                        progress * 100
                    );


                loadingBar.style.width =
                    `${percent}%`;


                const step =
                    steps.find(
                        item =>
                            percent <=
                            item.threshold
                    )
                    ||
                    steps[
                        steps.length - 1
                    ];


                statusText.textContent =
                    step.text;


                if (progress < 1) {

                    requestAnimationFrame(
                        animateLoader
                    );

                } else {

                    button.removeAttribute(
                        "disabled"
                    );
                }
            };


        requestAnimationFrame(
            animateLoader
        );


        button.addEventListener(
            "click",
            () => {

                overlay.classList.add(
                    "fade-out"
                );

                setTimeout(() => {

                    this.startAnimationSequence();

                }, 800);
            }
        );
    }


    createSepals() {

        const calyx =
            this.container.querySelector(
                "#calyx"
            );


        const step =
            360 / this.SEPALS_COUNT;


        for (
            let i = 0;
            i < this.SEPALS_COUNT;
            i++
        ) {

            const sepal =
                document.createElement(
                    "div"
                );


            sepal.className =
                "sepal";


            const angle =
                i * step
                +
                (Math.random() - 0.5) * 5;


            const delay =
                0.3 + i * 0.06;


            const curl =
                18 + Math.random() * 8;


            sepal.style.setProperty(
                "--sepal-angle",
                `${angle}deg`
            );


            sepal.style.setProperty(
                "--sepal-curl",
                `${curl}deg`
            );


            sepal.style.setProperty(
                "--sepal-delay",
                `${delay}s`
            );


            calyx.appendChild(
                sepal
            );
        }
    }


    createPetals() {

        const roseHead =
            this.container.querySelector(
                "#roseHead"
            );


        this.PETAL_LAYERS.forEach(
            (layer, layerIndex) => {

                const angleStep =
                    360 / layer.count;


                const layerOffset =
                    layerIndex * 24
                    +
                    (Math.random() - 0.5) * 8;


                for (
                    let i = 0;
                    i < layer.count;
                    i++
                ) {

                    const petal =
                        document.createElement(
                            "div"
                        );


                    petal.className =
                        `petal ${layer.cls}`;


                    const angle =
                        layerOffset
                        +
                        i * angleStep
                        +
                        (Math.random() - 0.5) * 5;


                    const delay =
                        layer.delayBase
                        +
                        i * 0.05;


                    const curlJitter =
                        (Math.random() - 0.5) * 6;


                    const scaleJitter =
                        0.94
                        +
                        Math.random() * 0.12;


                    const bloomDur =
                        2.1
                        +
                        Math.random() * 0.4;


                    petal.style.width =
                        `${layer.w}px`;


                    petal.style.height =
                        `${layer.h}px`;


                    petal.style.setProperty(
                        "--angle",
                        `${angle}deg`
                    );


                    petal.style.setProperty(
                        "--curl",
                        `${layer.curl + curlJitter}deg`
                    );


                    petal.style.setProperty(
                        "--scale",
                        scaleJitter
                    );


                    petal.style.setProperty(
                        "--delay",
                        `${delay}s`
                    );


                    petal.style.setProperty(
                        "--tz",
                        `${layer.tz}px`
                    );


                    petal.style.setProperty(
                        "--bloom-dur",
                        `${bloomDur}s`
                    );


                    roseHead.appendChild(
                        petal
                    );
                }
            }
        );
    }


    async startAnimationSequence() {

        await this.growStem();

        await this.delay(100);

        this.bloom();


        setTimeout(() => {

            const wrapper =
                this.container.querySelector(
                    "#roseWrapper"
                );

            wrapper.classList.add(
                "rotating"
            );

        }, 2600);


        setTimeout(() => {

            this.startFallingPetals();

        }, 3400);


        setTimeout(() => {

            const endText =
                this.container.querySelector(
                    "#endText"
                );

            endText.classList.add(
                "visible"
            );

        }, 4600);
    }


    growStem() {

        return new Promise(
            resolve => {

                const stem =
                    this.container.querySelector(
                        "#stem"
                    );

                const leafLeft =
                    this.container.querySelector(
                        "#leafLeft"
                    );

                const leafRight =
                    this.container.querySelector(
                        "#leafRight"
                    );


                stem.classList.add(
                    "grow"
                );


                setTimeout(() => {

                    leafLeft.classList.add(
                        "visible"
                    );

                }, 800);


                setTimeout(() => {

                    leafRight.classList.add(
                        "visible"
                    );

                }, 1100);


                setTimeout(
                    resolve,
                    2200
                );
            }
        );
    }


    bloom() {

        const calyx =
            this.container.querySelector(
                "#calyx"
            );

        const ambient =
            this.container.querySelector(
                "#ambientLight"
            );

        const roseHead =
            this.container.querySelector(
                "#roseHead"
            );


        calyx.classList.add(
            "visible"
        );


        ambient.classList.add(
            "visible"
        );


        roseHead.classList.add(
            "blooming"
        );
    }


    spawnFallingPetal() {

        const container =
            this.container.querySelector(
                "#fallingPetals"
            );


        if (
            container.childElementCount > 10
        ) {
            return;
        }


        const petal =
            document.createElement(
                "div"
            );


        petal.className =
            "falling-petal";


        const width =
            10 + Math.random() * 12;


        const height =
            width *
            (1.25 + Math.random() * 0.15);


        const x =
            20 + Math.random() * 60;


        const y =
            3 + Math.random() * 10;


        const duration =
            5.5 + Math.random() * 3.5;


        const delay =
            Math.random() * 0.6;


        const colors =
            this.FALLING_PETAL_COLORS[
                Math.floor(
                    Math.random()
                    *
                    this.FALLING_PETAL_COLORS.length
                )
            ];


        const sign =
            () =>
                Math.random() > 0.5
                    ? 1
                    : -1;


        const s1 =
            sign()
            *
            (15 + Math.random() * 25);


        const s2 =
            sign()
            *
            (10 + Math.random() * 20);


        const s3 =
            sign()
            *
            (20 + Math.random() * 30);


        const s4 =
            sign()
            *
            (10 + Math.random() * 15);


        petal.style.left =
            `${x}vw`;


        petal.style.top =
            `${y}vh`;


        petal.style.setProperty(
            "--fp-w",
            `${width}px`
        );


        petal.style.setProperty(
            "--fp-h",
            `${height}px`
        );


        petal.style.setProperty(
            "--fp-c1",
            colors[0]
        );


        petal.style.setProperty(
            "--fp-c2",
            colors[1]
        );


        petal.style.setProperty(
            "--f-dur",
            `${duration}s`
        );


        petal.style.setProperty(
            "--f-delay",
            `${delay}s`
        );


        petal.style.setProperty(
            "--s1",
            `${s1}px`
        );


        petal.style.setProperty(
            "--s2",
            `${s2}px`
        );


        petal.style.setProperty(
            "--s3",
            `${s3}px`
        );


        petal.style.setProperty(
            "--s4",
            `${s4}px`
        );


        container.appendChild(
            petal
        );


        setTimeout(() => {

            petal.remove();

        }, (duration + delay) * 1000 + 300);
    }


    startFallingPetals() {

        for (
            let i = 0;
            i < 3;
            i++
        ) {

            setTimeout(
                () => this.spawnFallingPetal(),
                i * 300
            );
        }


        this.fallingPetalInterval =
            setInterval(() => {

                this.spawnFallingPetal();

            }, 2200);
    }


    delay(ms) {

        return new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    ms
                )
        );
    }


    update() {}


    destroy() {

        if (
            this.fallingPetalInterval
        ) {

            clearInterval(
                this.fallingPetalInterval
            );

            this.fallingPetalInterval =
                null;
        }


        this.container?.remove();
    }
}