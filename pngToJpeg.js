document.getElementById('convertPngButton').addEventListener('click', convertPngToJpeg);

function convertPngToJpeg() {
    const pngFileInput = document.getElementById('pngFile');
    if (pngFileInput.files.length === 0) {
        alert('Please select a PNG file.');
        return;
    }

    const file = pngFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const jpegDataUrl = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = jpegDataUrl;
            link.download = 'output.jpeg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };

    reader.readAsDataURL(file);
}
