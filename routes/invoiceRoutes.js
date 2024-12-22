const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticateJWT, authorizeRole } = require('../middleware/auth');


router.get('/filter', authenticateJWT, authorizeRole('admin'), invoiceController.filterInvoicesByStatus);

// Route to create an invoice - only accessible by admin users
router.post('/', authenticateJWT, authorizeRole('admin'), invoiceController.createInvoice);

// Route to get all invoices - accessible by both admin and regular users
router.get('/', authenticateJWT, invoiceController.getInvoices);

// Route to get a specific invoice by ID - accessible by both admin and regular users
router.get('/:id', authenticateJWT, invoiceController.getInvoiceById);

// Route to update an invoice - only accessible by admin users
router.put('/:id', authenticateJWT, authorizeRole('admin'), invoiceController.updateInvoice);

// Route to delete an invoice - only accessible by admin users
router.delete('/:id', authenticateJWT, authorizeRole('admin'), invoiceController.deleteInvoice);
router.patch('/:id/payment-status', authenticateJWT, authorizeRole('admin'), invoiceController.updatePaymentStatus);

router.get('/:id/download', authenticateJWT, invoiceController.downloadInvoicePDF);

module.exports = router;