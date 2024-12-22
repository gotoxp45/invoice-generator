const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  customerDetails: {
    name: String,
    address: String,
    email: String,
    phone: String
  },
  invoiceDate: Date,
  dueDate: Date,
  items: [{ name: String, quantity: Number, unitPrice: Number }],
  taxRates: [Number],
  totalAmount: Number,
  paymentStatus: { type: String, enum: ['pending', 'paid', 'overdue'] },
  username: String
});

module.exports = mongoose.model('Invoice', invoiceSchema);