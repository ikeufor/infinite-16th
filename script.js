const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const photoInput =
    document.getElementById("photoInput");

const generateBtn =
    document.getElementById("generateBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

canvas.width = 1365;
canvas.height = 2048;

const frame = new Image();

frame.onload = () => {

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

frame.src = "assets/frame.png";

};

function loadImage(file){

    return new Promise((resolve)=>{

        const img = new Image();

        img.onload = () => resolve(img);

        img.src =
            URL.createObjectURL(file);

    });

}

function drawCoverImage(
    img,
    x,
    y,
    w,
    h
){

    const scale = Math.max(
        w / img.width,
        h / img.height
    );

    const width =
        img.width * scale;

    const height =
        img.height * scale;

    const dx =
        x + (w - width) / 2;

    const dy =
        y + (h - height) / 2;

    ctx.save();

    ctx.beginPath();

    ctx.rect(
        x,
        y,
        w,
        h
    );

    ctx.clip();

    ctx.drawImage(
        img,
        dx,
        dy,
        width,
        height
    );

    ctx.restore();

}

generateBtn.addEventListener(
    "click",
    async () => {

        const files =
            photoInput.files;

        if(files.length !== 4){

            alert(
                "Upload exactly 4 photos."
            );

            return;

        }

        const images = [];

        for(
            let i = 0;
            i < 4;
            i++
        ){

            images.push(
                await loadImage(
                    files[i]
                )
            );

        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const slots = [

            {
                x:47,
                y:160,
                w:588,
                h:409
            },

            {
                x:47,
                y:601,
                w:588,
                h:409
            },

            {
                x:47,
                y:1047,
                w:588,
                h:409
            },

            {
                x:47,
                y:1490,
                w:588,
                h:409
            },

            {
                x:731,
                y:54,
                w:589,
                h:409
            },

            {
                x:731,
                y:496,
                w:589,
                h:409
            },

            {
                x:731,
                y:946,
                w:589,
                h:409
            },

            {
                x:731,
                y:1390,
                w:589,
                h:409
            }

        ];

        for(
            let i = 0;
            i < 8;
            i++
        ){

            drawCoverImage(
                images[i % 4],
                slots[i].x,
                slots[i].y,
                slots[i].w,
                slots[i].h
            );

        }

        ctx.drawImage(
            frame,
            0,
            0
        );

    }
);

downloadBtn.addEventListener(
    "click",
    () => {

        const link =
            document.createElement(
                "a"
            );

        link.download =
            "infinite-photobox.png";

        link.href =
            canvas.toDataURL(
                "image/png"
            );

        link.click();

    }
);
