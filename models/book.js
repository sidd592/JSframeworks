// Load required packages
var mongoose = require('mongoose');

// Define our book schema
var BookSchema   = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Book', BookSchema);

