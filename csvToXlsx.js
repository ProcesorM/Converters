document.getElementById('convertCsvButton').addEventListener('click', convertCsvToXlsx);

function convertCsvToXlsx() {
    const csvFileInput = document.getElementById('csvFile');
    if (csvFileInput.files.length === 0) {
        alert('Please select a CSV file.');
        return;
    }

    const file = csvFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const xlsxData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const newWorkbook = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.aoa_to_sheet(xlsxData);
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');

        XLSX.writeFile(newWorkbook, 'output.xlsx');
    };

    reader.readAsBinaryString(file);
}
