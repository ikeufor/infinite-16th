const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const photoInput = document.getElementById("photoInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

// ukuran photobox final
canvas.width = 1200;
canvas.height = 1800;

// load frame
const frame = new Image();

frame.onload = () => {
    console.log("Frame loaded");

    // tampilkan frame saat pertama kali buka website
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

// pastikan path sesuai lokasi file
frame.src = "assets/frame.png";


// helper untuk load foto user
function loadImage(file) {
    return new Promise((resolve, reject) => {

        const img = new Image();

        img.onload = () => resolve(img);

        img.onerror = reject;

        img.src = URL.createObjectURL(file);

    });
}


// generate photobox
generateBtn.addEventListener("click", async () => {

    const files = photoInput.files;

    if (files.length < 4) {
        alert("Please upload 4 photos.");
        return;
    }

    try {

        const images = [];

        for (let i = 0; i < 4; i++) {
            const img = await loadImage(files[i]);
            images.push(img);
        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // posisi slot foto
        const slots = [
            { x: 100, y: 100, w: 1000, h: 350 },
            { x: 100, y: 500, w: 1000, h: 350 },
            { x: 100, y: 900, w: 1000, h: 350 },
            { x: 100, y: 1300, w: 1000, h: 350 }
        ];

        // gambar semua foto
        images.forEach((img, index) => {

            const slot = slots[index];

            ctx.drawImage(
                img,
                slot.x,
                slot.y,
                slot.w,
                slot.h
            );

        });

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

        alert("Error loading photos.");

    }

});


// download hasil
downloadBtn.addEventListener("click", () => {

    const link = document.createElement("a");

    link.download = "photobox.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

});
