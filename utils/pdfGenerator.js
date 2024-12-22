const PDFDocument = require('pdfkit');

const generateInvoicePDF = (invoice, res) => {
  const doc = new PDFDocument();

  // Set the response headers to download the PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);

  // Pipe the PDF into the response
  doc.pipe(res);

  // Add invoice details
  doc.fontSize(20).text(`Invoice: ${invoice.invoiceNumber}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Date: ${invoice.invoiceDate.toDateString()}`);
  doc.text(`Due Date: ${invoice.dueDate.toDateString()}`);
  doc.moveDown();
  doc.text(`Customer: ${invoice.customerDetails.name}`);
  doc.text(`Address: ${invoice.customerDetails.address}`);
  doc.text(`Email: ${invoice.customerDetails.email}`);
  doc.text(`Phone: ${invoice.customerDetails.phone}`);
  doc.moveDown();

  // Add items
  doc.text('Items:', { underline: true });
  invoice.items.forEach(item => {
    doc.text(`${item.name} - Quantity: ${item.quantity}, Unit Price: $${item.unitPrice.toFixed(2)}`);
  });
  doc.moveDown();

  // Add taxes
  doc.text('Taxes:', { underline: true });
  invoice.taxRates.forEach(rate => {
    doc.text(`Tax Rate: ${rate}%`);
  });
  doc.moveDown();

  // Add total amount
  doc.text(`Total Amount: $${invoice.totalAmount.toFixed(2)}`, { bold: true });

  // Finalize the PDF and end the stream
  doc.end();
};

module.exports = generateInvoicePDF;