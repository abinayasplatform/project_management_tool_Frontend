import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./TaskTable";

export default function printDocument() {
  const input = document.getElementById("divToPrint");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/jpeg");
    const pdf = new jsPDF();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Get the dimensions of the PDF page
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate the scale factors for fitting the canvas into the PDF page
    const scaleX = pageWidth / canvasWidth;
    const scaleY = pageHeight / canvasHeight;
    const scale = Math.min(scaleX, scaleY);

    // Calculate the new width and height of the scaled canvas
    const scaledWidth = canvasWidth * scale;
    const scaledHeight = canvasHeight * scale;

    // Add the scaled image to the PDF document
    pdf.addImage(imgData, "JPEG", 0, 0, scaledWidth, scaledHeight);
    // pdf.output('dataurlnewwindow');
    pdf.save("download.pdf");
  });
}
