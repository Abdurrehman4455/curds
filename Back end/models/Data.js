
const mongoose = require('mongoose');
const Department = require('../models/Department');

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
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
  },
  bloodGroup: {
    type: String,
    required: true
  },
  // Adding reference to Department
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department', 
    required: true 
  },  // Reference to Department
  departmentName: { 
    type: String 
  }  // Optionally/ Optionally store the department name for easier access
});


const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
