const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
