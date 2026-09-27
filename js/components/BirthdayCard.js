
export default class BirthdayCard {

    constructor(container, memoryManager) {

        this.container = container;
        this.memoryManager = memoryManager;

        this.element = null;
        this.cardImage = null;
        this.saveButton = null;
        this.status = null;
    }


    /* ========================================
       CREATE
    ======================================== */

    create() {

        const image =
            this.memoryManager.getSunsetImage();
        console.log(
            "🌅 Imagen recibida por BirthdayCard:",
            image
                ? `${image.substring(0, 40)}...`
                : "NO HAY IMAGEN"
        );

        this.element =
            document.createElement("div");

        this.element.className =
            "birthday-card-overlay";

        this.element.innerHTML = `

            <div class="birthday-card">

                <div class="birthday-card-image">
                    <img
                        src="${image || ""}"
                        alt="El atardecer que guardamos"
                    >

                    <div class="birthday-card-image-shade"></div>

                    <div class="birthday-card-rose">
                        🌹
                    </div>
                </div>


                <div class="birthday-card-content">

                    <div class="birthday-card-name">
                        Tammy ❤️
                    </div>

                    <h1>
                        Feliz cumpleaños.
                    </h1>

                    <p class="birthday-card-main">
                        De todos los atardeceres que existen,
                        quería guardar este contigo.
                    </p>

                    <p class="birthday-card-message">
                        Que nunca te falten motivos para sonreír,
                        lugares bonitos que descubrir y personas
                        que quieran verte feliz.
                    </p>

                    <div class="birthday-card-line"></div>

                    <p class="birthday-card-signature">
                        Con cariño, Pedro 🌹
                    </p>

                    <button
                        class="birthday-card-save"
                        type="button"
                    >
                        💌 Guardar mi tarjeta
                    </button>

                    <div class="birthday-card-status"></div>

                </div>

            </div>
        `;

        this.container.appendChild(
            this.element
        );


        this.saveButton =
            this.element.querySelector(
                ".birthday-card-save"
            );

        this.status =
            this.element.querySelector(
                ".birthday-card-status"
            );


        this.saveButton.addEventListener(
            "click",
            this.handleSave
        );


        requestAnimationFrame(() => {

            this.element.classList.add(
                "visible"
            );

        });
    }


    /* ========================================
       SAVE
    ======================================== */

    handleSave = async () => {

        if (
            this.saveButton.disabled
        ) {
            return;
        }

        this.saveButton.disabled = true;

        this.saveButton.textContent =
            "✨ Preparando tu tarjeta...";

        this.status.textContent =
            "Un momento ❤️";


        try {

            await this.generatePNG();

            this.saveButton.textContent =
                "💌 Tarjeta guardada";

            this.status.textContent =
                "Para ti, Tammy 🌹";

        } catch (error) {

            console.error(
                "Error generando tarjeta:",
                error
            );

            this.saveButton.disabled =
                false;

            this.saveButton.textContent =
                "💌 Guardar mi tarjeta";

            this.status.textContent =
                "No pude generar la tarjeta. Inténtalo otra vez.";
        }
    };


    /* ========================================
       GENERATE PNG
    ======================================== */

    async generatePNG() {

        const imageData =
            this.memoryManager.getSunsetImage();

        if (!imageData) {

            throw new Error(
                "No existe una imagen del atardecer."
            );
        }


        const image =
            await this.loadImage(
                imageData
            );


        /*
         * Formato vertical pensado
         * para teléfonos.
         */

        const width = 1080;
        const height = 1920;

        const canvas =
            document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx =
            canvas.getContext("2d");


        /*
         * ====================================
         * FONDO
         * ====================================
         */

        const background =
            ctx.createLinearGradient(
                0,
                0,
                0,
                height
            );

        background.addColorStop(
            0,
            "#12030a"
        );

        background.addColorStop(
            0.45,
            "#210711"
        );

        background.addColorStop(
            1,
            "#050205"
        );

        ctx.fillStyle =
            background;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /*
         * ====================================
         * ATARDECER
         * ====================================
         */

        const imageHeight = 900;

        this.drawCoverImage(
            ctx,
            image,
            0,
            0,
            width,
            imageHeight
        );


        /*
         * ====================================
         * SOMBRA SOBRE FOTO
         * ====================================
         */

        const imageGradient =
            ctx.createLinearGradient(
                0,
                300,
                0,
                imageHeight
            );

        imageGradient.addColorStop(
            0,
            "rgba(10,0,5,0)"
        );

        imageGradient.addColorStop(
            0.55,
            "rgba(10,0,5,0.15)"
        );

        imageGradient.addColorStop(
            1,
            "rgba(10,0,5,0.95)"
        );

        ctx.fillStyle =
            imageGradient;

        ctx.fillRect(
            0,
            0,
            width,
            imageHeight
        );


        /*
         * ====================================
         * DECORACIÓN
         * ====================================
         */

        ctx.textAlign = "center";

        ctx.font =
            '42px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "#f3c5d2";

        ctx.fillText(
            "Tammy ❤️",
            width / 2,
            1030
        );


        /*
         * ====================================
         * TÍTULO
         * ====================================
         */

        ctx.font =
            'bold 76px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "#ffffff";

        ctx.fillText(
            "Feliz cumpleaños.",
            width / 2,
            1130
        );


        /*
         * ====================================
         * FRASE PRINCIPAL
         * ====================================
         */

        ctx.font =
            'italic 43px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "#f4dce3";

        this.drawWrappedText(
            ctx,
            "De todos los atardeceres que existen, quería guardar este contigo.",
            width / 2,
            1235,
            820,
            62
        );


        /*
         * ====================================
         * MENSAJE
         * ====================================
         */

        ctx.font =
            '32px Arial, sans-serif';

        ctx.fillStyle =
            "rgba(255,255,255,0.82)";

        this.drawWrappedText(
            ctx,
            "Que nunca te falten motivos para sonreír, lugares bonitos que descubrir y personas que quieran verte feliz.",
            width / 2,
            1430,
            800,
            48
        );


        /*
         * ====================================
         * LÍNEA
         * ====================================
         */

        ctx.beginPath();

        ctx.moveTo(
            420,
            1620
        );

        ctx.lineTo(
            660,
            1620
        );

        ctx.strokeStyle =
            "rgba(255,190,210,0.5)";

        ctx.lineWidth = 2;

        ctx.stroke();


        /*
         * ====================================
         * FIRMA
         * ====================================
         */

        ctx.font =
            'italic 34px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "#f3c5d2";

        ctx.fillText(
            "Con cariño, Pedro 🌹",
            width / 2,
            1700
        );


        /*
         * ====================================
         * PEQUEÑA DECORACIÓN
         * ====================================
         */

        ctx.font =
            '28px Georgia, "Times New Roman", serif';

        ctx.fillStyle =
            "rgba(255,255,255,0.55)";

        ctx.fillText(
            "✦",
            width / 2,
            1775
        );


        /*
         * ====================================
         * DESCARGA
         * ====================================
         */

        const link =
            document.createElement("a");

        link.download =
            "Para_Tammy_Feliz_Cumpleanos.png";

        link.href =
            canvas.toDataURL(
                "image/png"
            );

        document.body.appendChild(
            link
        );

        link.click();

        link.remove();
    }


    /* ========================================
       IMAGE
    ======================================== */

    loadImage(src) {

        return new Promise(
            (resolve, reject) => {

                const image =
                    new Image();

                image.onload =
                    () => resolve(image);

                image.onerror =
                    () => reject(
                        new Error(
                            "No se pudo cargar la imagen."
                        )
                    );

                image.src = src;
            }
        );
    }


    /* ========================================
       COVER IMAGE
    ======================================== */

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
                (image.width -
                    sourceWidth) / 2;

        } else {

            sourceHeight =
                image.width /
                targetRatio;

            sourceY =
                (image.height -
                    sourceHeight) / 2;
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


    /* ========================================
       WRAPPED TEXT
    ======================================== */

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

            const metrics =
                ctx.measureText(
                    testLine
                );

            if (
                metrics.width >
                    maxWidth &&
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
                        index *
                        lineHeight
                );
            }
        );
    }


    /* ========================================
       DESTROY
    ======================================== */

    destroy() {

        this.saveButton?.removeEventListener(
            "click",
            this.handleSave
        );

        this.element?.remove();
    }
}
