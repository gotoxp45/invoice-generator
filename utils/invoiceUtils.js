const InvoiceNumber = require('../models/InvoiceNumber');

const generateInvoiceNumber = async () => {
    try {
      // Find the document that stores the latest invoice number
      let invoiceNumberDoc = await InvoiceNumber.findOne();
  
      if (!invoiceNumberDoc) {
        // If no document exists, create one with the initial invoice number
        invoiceNumberDoc = new InvoiceNumber({ invoiceNumber: 1 });
      } else {
        // Increment the invoice number
        invoiceNumberDoc.invoiceNumber += 1;
      }
  
      // Save the updated document
      await invoiceNumberDoc.save();
  
      // Return the new invoice number in the desired format
      return `INV-${invoiceNumberDoc.invoiceNumber}`;
    } catch (error) {
      throw new Error('Error generating invoice number');
    }
  };

const calculateTotalAmount = (items, taxRates, discount = 0) => {
  let total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  let taxAmount = taxRates.reduce((sum, rate) => sum + (total * rate / 100), 0);
  return total + taxAmount - discount;
};

// utils/invoiceUtils.js
const calculateTotalAmountp = (items, taxRates, discount = 0) => {
    // Calculate subtotal by summing up the total for each item
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  
    // Calculate total tax amount
    const totalTax = taxRates.reduce((sum, rate) => sum + (subtotal * rate / 100), 0);
  
    // Calculate total amount by adding subtotal and total tax, then subtracting any discount
    const totalAmount = subtotal + totalTax - discount;
  
    return totalAmount;
  };
  

module.exports = { generateInvoiceNumber, calculateTotalAmount,calculateTotalAmountp };