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


router.delete('/data/:id', async (req, res) => {
  const { id } = req.params;

  try {
      console.log('Received id for deletion:', id); // Debugging: Log id

      // Attempt to find and delete the entry using _id
      const deletedData = await Data.findByIdAndDelete(id);

      if (!deletedData) {
          console.log(`No data found with id: ${id}`);
          return res.status(404).json({ message: 'Data not found' });
      }

      res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
});
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    // If the search query is empty, return an empty array
    if (!q) {
      return res.status(200).json([]);
    }

    // Search for items that match the query (modify fields as necessary)
    const searchResults = await Data.find({
      $or: [
        { name: { $regex: q, $options: 'i' } }, // Case-insensitive search in the 'name' field
        { description: { $regex: q, $options: 'i' } }, 
        { departmentName: { $regex: q, $options: 'i' } }// Add more fields if needed
      ]
    });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Error fetching search results', error: error.message });
  }
});

router.put('/data/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the URL
  const { name, lastname, address, contactNo, bloodGroup, departmentId } = req.body; // Get data from the request body

  try {
      // Find the data by ID and update it with the new values
      const updatedData = await Data.findByIdAndUpdate(
          id, 
          { name, lastname, address, contactNo, bloodGroup, department: departmentId },
          { new: true, runValidators: true } // Return the updated document and run schema validation
      );

      if (!updatedData) {
          return res.status(404).json({ message: 'Data not found' });
      }

      res.status(200).json(updatedData);
  } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ message: 'Error updating data', error: error.message });
  }
});


    
module.exports = router;
