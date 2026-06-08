const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const photoInput =
document.getElementById("photoInput");

const generateBtn =
document.getElementById("generateBtn");

const downloadBtn =
document.getElementById("downloadBtn");

// =====================
// CANVAS SIZE
// =====================

canvas.width = 1365;
canvas.height = 2048;

// =====================
// FRAME
// =====================

const frame = new Image();

frame.onload = () => {

```
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
```

};

frame.src = "assets/frame.png";

// =====================
// LOAD IMAGE
// =====================

function loadImage(file){

```
return new Promise(
    (resolve,reject)=>{

        const img =
            new Image();

        img.onload =
            ()=>resolve(img);

        img.onerror =
            reject;

        img.src =
            URL.createObjectURL(file);

    }
);
```

}

// =====================
// OBJECT FIT COVER
// =====================

function drawCoverImage(
ctx,
img,
x,
y,
w,
h
){

```
const scale = Math.max(
    w / img.width,
    h / img.height
);

const drawWidth =
    img.width * scale;

const drawHeight =
    img.height * scale;

const offsetX =
    x + (w - drawWidth) / 2;

const offsetY =
    y + (h - drawHeight) / 2;

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
    offsetX,
    offsetY,
    drawWidth,
    drawHeight
);

ctx.restore();
```

}

// =====================
// GENERATE
// =====================

generateBtn.addEventListener(
"click",
async ()=>{

```
    const files =
        photoInput.files;

    if(files.length !== 4){

        alert(
            "Please upload exactly 4 photos."
        );

        return;

    }

    try{

        const images = [];

        for(
            let i = 0;
            i < 4;
            i++
        ){

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

        const slots = [

            // LEFT

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

            // RIGHT

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

        ctx.drawImage(
            frame,
            0,
            0,
            canvas.width,
            canvas.height
        );

    }catch(error){

        console.error(error);

        alert(
            "Failed to generate photobox."
        );

    }

}
```

);

// =====================
// DOWNLOAD
// =====================

downloadBtn.addEventListener(
"click",
()=>{

```
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
```

);
