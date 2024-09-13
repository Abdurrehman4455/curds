const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentid: {
        type: String,
        required: true,
        unique: true
    },
    departmentname: {
        type: String,
        required: true
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
