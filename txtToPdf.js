document.getElementById('convertTxtButton').addEventListener('click', convertTxtToPdf);

function convertTxtToPdf() {
    const txtFileInput = document.getElementById('txtFile');
    if (txtFileInput.files.length === 0) {
        alert('Please select a TXT file.');
        return;
    }

    const file = txtFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = e.target.result;
        const pdf = new jsPDF();
        pdf.text(data, 10, 10);
        pdf.save('output.pdf');
    };

    reader.readAsText(file);
}
