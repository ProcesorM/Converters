document.getElementById('convertWebpButton').addEventListener('click', async () => {
    const webpFileInput = document.getElementById('webpFile');
    if (webpFileInput.files.length === 0) {
        alert('Please select a WebP file.');
        return;
    }

    const file = webpFileInput.files[0];
    const ffmpeg = createFFmpeg({ log: true });
    
    await ffmpeg.load();
    ffmpeg.FS('writeFile', file.name, await fetchFile(file));
    
    await ffmpeg.run('-i', file.name, '-qscale', '0', 'output.jpg');

    const jpegData = ffmpeg.FS('readFile', 'output.jpg');
    const jpegBlob = new Blob([jpegData.buffer], { type: 'image/jpeg' });
    const url = URL.createObjectURL(jpegBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    await ffmpeg.exit();
});

async function fetchFile(file) {
    return new Uint8Array(await new Response(file).arrayBuffer());
}
