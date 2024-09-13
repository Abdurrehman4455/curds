const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
const Department = require('../models/Department');

// Route to add new data with department selection
router.post('/add', async (req, res) => {
  const { name, lastname, address, contactNo, bloodGroup, departmentId } = req.body;

  // Log the data received from the frontend
  console.log("Received data:", req.body);

  // Check for missing required fields
  if (!name || !lastname || !contactNo || !departmentId) {
    console.log("Missing required fields");
    return res.status(400).send({ error: 'Missing required fields' });
  }

  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      console.log("Department not found");
      return res.status(404).send({ error: 'Department not found' });
    }

    // Save the data
    const newData = new Data({
      name,
      lastname,
      address,
      contactNo,
      bloodGroup,
      department: department._id,
      departmentName: department.departmentname  // Optional for easy reference
    });

    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ error: 'Server error', details: error.message });
  }
});


// Corrected route to fetch data with populated department field
router.get('/data', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to 1 if no page provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 if no limit provided
    const skip = (page - 1) * limit; // Calculate the number of entries to skip
    
    // Get the total count of documents
    const totalEntries = await Data.countDocuments();

    // Fetch the paginated data and populate the department field
    const data = await Data.find()
      .populate('department', 'departmentname')
      .skip(skip)
      .limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(totalEntries / limit);

    res.status(200).json({
      data,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


router.delete('/data/contactNo', async (req, res) => {
  const { contactNo } = req.params;

  try {
    // Find the data entry to delete
    const deletedData = await Data.findOneAndDelete({ contactNo });

    if (!deletedData) {
      return res.status(404).send({ message: 'Data not found' });
    }

    // Optionally delete the related department if it exists
    if (deletedData.department) {
      const deletedDepartment = await Department.findByIdAndDelete(deletedData.department);
      if (deletedDepartment) {
        console.log("Related department deleted:", deletedDepartment);
      }
    }

    res.status(200).send({
      message: 'Data and associated department deleted successfully',
      data: deletedData,
    });
  } catch (error) {
    console.error("Error deleting data and department:", error);
    res.status(500).send({
      message: 'Error deleting data and department',
      error: error.message,
    });
  }
});

    
module.exports = router;
