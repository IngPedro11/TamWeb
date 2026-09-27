import BirthdayCard from "../components/BirthdayCard.js";

export default class FlowerScene {

    constructor(
        sceneManager,
        memoryManager
    ) {
        this.sceneManager =
            sceneManager;

        this.memoryManager =
            memoryManager;
        this.birthdayCard = null;

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
        setTimeout(() => {

            this.showFinalMessage();

        }, 6200);

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

        this.birthdayCard?.destroy();

        this.container?.remove();
    }

    showFinalMessage() {

        const endText =
            this.container.querySelector("#endText");

        endText.innerHTML = `
            <p class="final-name">
                Tammy ❤️
            </p>

            <h2 class="final-title">
                Feliz cumpleaños.
            </h2>

            <p class="final-message">
                Espero que este pequeño recuerdo
                te saque una sonrisa cada vez
                que lo vuelvas a ver.
            </p>

            <p class="final-signature">
                — Pedro 🌹
            </p>

            <button
                class="memory-button"
                id="memoryButton"
                type="button"
            >
                💌 Obtener recuerdito
            </button>

            <div
                class="memory-status"
                id="memoryStatus"
            ></div>
        `;

        endText.classList.add("visible");

        const button =
            this.container.querySelector("#memoryButton");

        const status =
            this.container.querySelector("#memoryStatus");

        button.addEventListener(
            "click",
            async () => {

                button.disabled = true;

                button.textContent =
                    "✨ Preparando tu recuerdito...";

                status.textContent =
                    "Guardando ese atardecer ❤️";

                try {

                    await this.generateBirthdayMemory();

                    button.textContent =
                        "💌 Recuerdito guardado";

                    status.textContent =
                        "Para ti, Tammy 🌹";

                } catch (error) {

                    console.error(error);

                    button.disabled = false;

                    button.textContent =
                        "💌 Obtener recuerdito";

                    status.textContent =
                        "No pude guardarlo. Inténtalo otra vez.";
                }
            }
        );
    }

    async generateBirthdayMemory() {

        const imageData =
            this.memoryManager.getSunsetImage();

        if (!imageData) {

            throw new Error(
                "No existe una captura del atardecer."
            );
        }

        const image =
            await this.loadImage(imageData);

        const width = 1080;
        const height = 1920;

        const canvas =
            document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx =
            canvas.getContext("2d");

        // Fondo
        const background =
            ctx.createLinearGradient(
                0,
                0,
                0,
                height
            );

        background.addColorStop(
            0,
            "#16040b"
        );

        background.addColorStop(
            0.55,
            "#260914"
        );

        background.addColorStop(
            1,
            "#050205"
        );

        ctx.fillStyle = background;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );

        /*
        * ATARDECER
        *
        * Usamos la imagen completa que capturamos
        * en SunsetScene.
        */

        const imageHeight = 920;

        this.drawCoverImage(
            ctx,
            image,
            0,
            0,
            width,
            imageHeight
        );

        // Degradado sobre el atardecer
        const shade =
            ctx.createLinearGradient(
                0,
                300,
                0,
                imageHeight
            );

        shade.addColorStop(
            0,
            "rgba(10,0,5,0)"
        );

        shade.addColorStop(
            0.55,
            "rgba(10,0,5,0.08)"
        );

        shade.addColorStop(
            1,
            "rgba(10,0,5,0.95)"
        );

        ctx.fillStyle = shade;

        ctx.fillRect(
            0,
            0,
            width,
            imageHeight
        );

        ctx.textAlign = "center";

        // Nombre
        ctx.font =
            '42px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "#f3c5d2";

        ctx.fillText(
            "Tammy ❤️",
            width / 2,
            1080
        );

        // Título
        ctx.font =
            'bold 76px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "#ffffff";

        ctx.fillText(
            "Feliz cumpleaños.",
            width / 2,
            1190
        );

        // Mensaje principal
        ctx.font =
            'italic 42px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "#f4dce3";

        this.drawWrappedText(
            ctx,
            "De todos los atardeceres que existen, quería que le tomaras foto a este.",
            width / 2,
            1300,
            820,
            62
        );

        // Mensaje final
        ctx.font =
            '32px Arial, sans-serif';

        ctx.fillStyle =
            "rgba(255,255,255,0.78)";

        this.drawWrappedText(
            ctx,
            "Espero que este pequeño recuerdo te saque una sonrisa cada vez que lo vuelvas a ver.",
            width / 2,
            1480,
            800,
            48
        );

        // Línea
        ctx.beginPath();

        ctx.moveTo(
            420,
            1650
        );

        ctx.lineTo(
            660,
            1650
        );

        ctx.strokeStyle =
            "rgba(255,190,210,0.5)";

        ctx.lineWidth = 2;

        ctx.stroke();

        // Firma
        ctx.font =
            'italic 36px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "#f3c5d2";

        ctx.fillText(
            "— Pedro 🌹",
            width / 2,
            1730
        );

        // Pequeño detalle
        ctx.font =
            '28px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "rgba(255,255,255,0.5)";

        ctx.fillText(
            "✦",
            width / 2,
            1810
        );

        // Descargar
        const link =
            document.createElement("a");

        link.download =
            "Para_Tammy_Feliz_Cumpleanos.png";

        link.href =
            canvas.toDataURL(
                "image/png"
            );

        document.body.appendChild(link);

        link.click();

        link.remove();
    }

    loadImage(src) {

    return new Promise(
        (resolve, reject) => {

            const image =
                new Image();

            image.onload = () =>
                resolve(image);

            image.onerror = () =>
                reject(
                    new Error(
                        "No se pudo cargar el atardecer."
                    )
                );

            image.src = src;
        }
    );
}
drawCoverImage(
    ctx,
    image,
    x,
    y,
    width,
    height
) {

    const imageRatio =
        image.width /
        image.height;

    const targetRatio =
        width /
        height;

    let sourceWidth =
        image.width;

    let sourceHeight =
        image.height;

    let sourceX = 0;
    let sourceY = 0;

    if (
        imageRatio >
        targetRatio
    ) {

        sourceWidth =
            image.height *
            targetRatio;

        sourceX =
            (
                image.width -
                sourceWidth
            ) / 2;

    } else {

        sourceHeight =
            image.width /
            targetRatio;

        sourceY =
            (
                image.height -
                sourceHeight
            ) / 2;
    }

    ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        width,
        height
    );
}

drawWrappedText(
    ctx,
    text,
    centerX,
    startY,
    maxWidth,
    lineHeight
) {

    const words =
        text.split(" ");

    const lines = [];

    let line = "";

    words.forEach(word => {

        const testLine =
            line
                ? `${line} ${word}`
                : word;

        const width =
            ctx.measureText(
                testLine
            ).width;

        if (
            width > maxWidth &&
            line
        ) {

            lines.push(line);

            line = word;

        } else {

            line = testLine;
        }
    });

    if (line) {
        lines.push(line);
    }

    lines.forEach(
        (currentLine, index) => {

            ctx.fillText(
                currentLine,
                centerX,
                startY +
                index * lineHeight
            );
        }
    );
}

}

