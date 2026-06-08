const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const photoInput = document.getElementById("photoInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

const frame = new Image();
frame.src = "assets/frame.png";

canvas.width = 1200;
canvas.height = 1800;

generateBtn.addEventListener("click", async () => {

    const files = photoInput.files;

    if (files.length < 4) {
        alert("Upload 4 photos");
        return;
    }

    const images = [];

    for (let file of files) {

        const img = new Image();

        img.src = URL.createObjectURL(file);

        await new Promise(resolve => {
            img.onload = resolve;
        });

        images.push(img);
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const slots = [
        { x: 100, y: 100, w: 1000, h: 350 },
        { x: 100, y: 500, w: 1000, h: 350 },
        { x: 100, y: 900, w: 1000, h: 350 },
        { x: 100, y: 1300, w: 1000, h: 350 }
    ];

    images.slice(0,4).forEach((img,index)=>{

        const slot = slots[index];

        ctx.drawImage(
            img,
            slot.x,
            slot.y,
            slot.w,
            slot.h
        );
    });

    await new Promise(resolve => {
        frame.onload = resolve;
    });

    ctx.drawImage(
        frame,
        0,
        0,
        canvas.width,
        canvas.height
    );

});

downloadBtn.addEventListener("click", () => {

    const link = document.createElement("a");

    link.download = "photobox.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

});
