const Invoice = require('../models/Invoice');
const { generateInvoiceNumber, calculateTotalAmount ,calculateTotalAmountp } = require('../utils/invoiceUtils');
const invoiceEmitter = require('../events/invoiceEvents');
const generateInvoicePDF = require('../utils/pdfGenerator');

exports.createInvoice = async (req, res) => {
  try {
    const { customerDetails, invoiceDate, dueDate, items, taxRates, discount, username } = req.body;
    
    const invoiceNumber = await generateInvoiceNumber(); // Ensure this is awaited

    // Calculate the total amount using the utility function
    const totalAmount = calculateTotalAmountp(items, taxRates, discount);

    const invoice = new Invoice({
      invoiceNumber,
      customerDetails,
      invoiceDate,
      dueDate,
      items,
      taxRates,
      totalAmount,
      paymentStatus: 'pending',
      username 
    });

    await invoice.save();
    invoiceEmitter.emit('invoiceCreated', invoice);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    let invoices;
    if (req.user.role === 'admin') {
      // Admin can access all invoices
      invoices = await Invoice.find();
    } else {
      // Regular users can only access their own invoices
      invoices = await Invoice.find({ username: req.user.username });
    }
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if the user has access to this invoice
    if (req.user.role !== 'admin' && invoice.username !== req.user.username) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true });
    invoiceEmitter.emit('invoiceUpdated', updatedInvoice);
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    await Invoice.findByIdAndDelete(id);
    invoiceEmitter.emit('invoiceDeleted', id);
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { paymentStatus } = req.body;
  
      // Validate payment status
      const validStatuses = ['pending', 'paid', 'overdue'];
      if (!validStatuses.includes(paymentStatus)) {
        return res.status(400).json({ message: 'Invalid payment status' });
      }
  
      // Update the payment status of the invoice
      const updatedInvoice = await Invoice.findByIdAndUpdate(
        id,
        { paymentStatus },
        { new: true }
      );
  
      if (!updatedInvoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      invoiceEmitter.emit('invoiceUpdated', updatedInvoice);
      res.status(200).json(updatedInvoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.filterInvoicesByStatus = async (req, res) => {
    try {
      const { status } = req.query; // Use query parameters instead of body
  
      // Validate the status
      const validStatuses = ['pending', 'paid', 'overdue'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid payment status' });
      }
  
      let invoices;
      invoices = await Invoice.find({ paymentStatus: status });
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.downloadInvoicePDF = async (req, res) => {
    try {
      const { id } = req.params;
      const invoice = await Invoice.findById(id);
  
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      if (req.user.role == 'admin') {
        generateInvoicePDF(invoice, res);
        return;
    }

      if (invoice.username !== req.user.username) {
        return res.status(403).json({ message: 'Access Denied' });
      }
  
      // Generate and send the PDF
      generateInvoicePDF(invoice, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };