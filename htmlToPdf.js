const convertHtmlButton = document.getElementById('htmlToPdfForm').addEventListener('submit', convertHtmlToPdf);

function convertHtmlToPdf(e) {
  e.preventDefault()

  const csvFileInput = document.getElementById('htmlFile');
  if (csvFileInput.files.length === 0) {
      alert('Please select a HTML file.');
      return;
  }

  const file = csvFileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e){
    const data = e.target.result;
    var pdf = new jsPDF('p', 'pt', 'letter');
    
    margins = {top: 80, bottom: 60, left: 40, width: 522};
      pdf.fromHTML(data, margins.left, margins.top, { 'width': margins.width},
        
        function (dispose) {
          pdf.save('ConvertedHTML.pdf');
        }, margins);
      }
      reader.readAsText(file);
    }
