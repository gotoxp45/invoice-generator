const mongoose = require('mongoose');

const invoiceNumberSchema = new mongoose.Schema({
  invoiceNumber: { type: Number, unique: true, required: true },
 });

module.exports = mongoose.model('invoiceNumberSchema', invoiceNumberSchema);