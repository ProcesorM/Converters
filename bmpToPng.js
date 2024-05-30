document.getElementById('convertBmpButton').addEventListener('click', convertBmpToPng);

function convertBmpToPng() {
    const bmpFileInput = document.getElementById('bmpFile');
    if (bmpFileInput.files.length === 0) {
        alert('Please select a BMP file.');
        return;
    }

    const file = bmpFileInput.files[0];
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

            canvas.toBlob(function (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'output.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, 'image/png');
        };
    };

    reader.readAsDataURL(file);
}
