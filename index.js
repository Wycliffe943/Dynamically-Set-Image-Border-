const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const reader = new FileReader();
const img = new Image();

const uploadImage = (e) => {
    reader.onload = () => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const topLeft = ctx.getImageData(0, 0, 1, 1).data;
            //const topRight = ctx.getImageData(canvas.width - 1, 0, 1, 1).data;
            //const bottomLeft = ctx.getImageData(0, canvas.height - 1, 1, 1).data;
            const bottomRight = ctx.getImageData(canvas.width - 1, canvas.height - 1, 1, 1).data;

            const rgbString = `rgb(${topLeft[0]}, ${topLeft[1]}, ${topLeft[2]})`;
            const rgbString2 = `rgb(${bottomRight[0]}, ${bottomRight[1]}, ${bottomRight[2]})`;
            
            canvas.style.borderTopColor = rgbString;
            canvas.style.borderBottomColor = rgbString2;
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
};

const imageLoader = document.getElementById('uploader')
imageLoader.addEventListener('change', uploadImage)

function download() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.png";
    link.click();
}

document.querySelector("button").addEventListener("click", download); 
