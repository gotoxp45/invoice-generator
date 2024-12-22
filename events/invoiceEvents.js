const EventEmitter = require('events');
const invoiceEmitter = new EventEmitter();

// Example event listeners
invoiceEmitter.on('invoiceCreated', (invoice) => {
  console.log(`Invoice created: ${invoice.invoiceNumber}`);
  // Additional logic for when an invoice is created, e.g., sending a notification
});

invoiceEmitter.on('invoiceUpdated', (invoice) => {
  console.log(`Invoice updated: ${invoice.invoiceNumber}`);
  // Additional logic for when an invoice is updated
});

invoiceEmitter.on('invoiceDeleted', (invoiceId) => {
  console.log(`Invoice deleted: ${invoiceId}`);
  // Additional logic for when an invoice is deleted
});

module.exports = invoiceEmitter;