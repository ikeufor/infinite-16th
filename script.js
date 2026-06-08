const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const photoInput = document.getElementById("photoInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

// ukuran final photobox
canvas.width = 1200;
canvas.height = 1800;

// =========================
// LOAD FRAME
// =========================

const frame = new Image();

frame.onload = () => {

    console.log("Frame loaded");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.drawImage(
        frame,
        0,
        0,
        canvas.width,
        canvas.height
    );

};

frame.onerror = () => {

    console.error("Frame failed to load");

};

frame.src = "assets/frame.png";


// =========================
// LOAD USER IMAGE
// =========================

function loadImage(file) {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.onload = () => resolve(img);

        img.onerror = reject;

        img.src = URL.createObjectURL(file);

    });

}


// =========================
// OBJECT-FIT COVER
// =========================

function drawCoverImage(
    ctx,
    img,
    x,
    y,
    w,
    h
) {

    const imageRatio =
        img.width / img.height;

    const frameRatio =
        w / h;

    let sx;
    let sy;
    let sw;
    let sh;

    if (imageRatio > frameRatio) {

        sh = img.height;

        sw = sh * frameRatio;

        sx =
            (img.width - sw) / 2;

        sy = 0;

    } else {

        sw = img.width;

        sh = sw / frameRatio;

        sx = 0;

        sy =
            (img.height - sh) / 2;

    }

    ctx.drawImage(
        img,
        sx,
        sy,
        sw,
        sh,
        x,
        y,
        w,
        h
    );

}


// =========================
// GENERATE PHOTOBOX
// =========================

generateBtn.addEventListener(
    "click",
    async () => {

        const files =
            photoInput.files;

        if (files.length !== 4) {

            alert(
                "Please upload exactly 4 photos."
            );

            return;

        }

        try {

            const images = [];

            for (
                let i = 0;
                i < 4;
                i++
            ) {

                const img =
                    await loadImage(
                        files[i]
                    );

                images.push(img);

            }

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            // =====================
            // SLOT POSITIONS
            // =====================

            const slots = [

                // kiri atas
                {
                    x: 70,
                    y: 150,
                    w: 430,
                    h: 300
                },

                // kiri 2
                {
                    x: 70,
                    y: 550,
                    w: 430,
                    h: 300
                },

                // kiri 3
                {
                    x: 70,
                    y: 950,
                    w: 430,
                    h: 300
                },

                // kiri bawah
                {
                    x: 70,
                    y: 1350,
                    w: 430,
                    h: 300
                },

                // kanan atas
                {
                    x: 700,
                    y: 150,
                    w: 430,
                    h: 300
                },

                // kanan 2
                {
                    x: 700,
                    y: 550,
                    w: 430,
                    h: 300
                },

                // kanan 3
                {
                    x: 700,
                    y: 950,
                    w: 430,
                    h: 300
                },

                // kanan bawah
                {
                    x: 700,
                    y: 1350,
                    w: 430,
                    h: 300
                }

            ];

            // =====================
            // FILL 8 BOXES
            // =====================

            for (
                let i = 0;
                i < 8;
                i++
            ) {

                const img =
                    images[i % 4];

                const slot =
                    slots[i];

                drawCoverImage(
                    ctx,
                    img,
                    slot.x,
                    slot.y,
                    slot.w,
                    slot.h
                );

            }

            // gambar frame paling atas

            ctx.drawImage(
                frame,
                0,
                0,
                canvas.width,
                canvas.height
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to generate photobox."
            );

        }

    }
);


// =========================
// DOWNLOAD
// =========================

downloadBtn.addEventListener(
    "click",
    () => {

        const link =
            document.createElement(
                "a"
            );

        link.download =
            "photobox.png";

        link.href =
            canvas.toDataURL(
                "image/png"
            );

        link.click();

    }
);
