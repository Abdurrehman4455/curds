const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// Route to add new data
router.post('/add', async (req, res) => {
 
  const { name, lastname, address, contactNo, bloodGroup } = req.body;
  const newData = new Data({ name, lastname, address, contactNo, bloodGroup });
  try {
    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get('/data', async (req, res) => {
  try {
    const alldata = await Data.find();
    res.status(200).json(alldata);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/data/:contactNo', async (req, res) => {
  const { contactNo } = req.params;
  const { name, lastname, address,bloodGroup } = req.body;

  try {
    const updatedData = await Data.findOneAndUpdate(
      { contactNo }, // Find the document by contactNo
      { name, lastname, address, bloodGroup }, // Update these fields
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedData) {
      return res.status(404).send({ message: 'Data not found' });
    }

    res.status(200).send(updatedData);
  } catch (error) {
    res.status(400).send(error);
  }
});
//search
router.get('/search', async (req, res) => {
  const { q } = req.query; // Get the search query parameter

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' }); // Ensure query parameter is provided
  }

  try {
    // Use regex to match partial strings in a case-insensitive manner
    const regex = new RegExp(q, 'i'); 

    const searchData = await Data.find({
      $or: [ // Match any of the fields
        { name: regex },
        { lastname: regex },
        { address: regex },
        { contactNo: regex },
        { bloodGroup: regex }
      ]
    });

    res.status(200).json(searchData);
  } catch (error) {
    console.error('Error in search route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ensure the correct path to your Mongoose model

// DELETE route to delete a single record by contactNo
router.delete('/data/:contactNo', async (req, res) => {
  const { contactNo } = req.params;

  try {
    const deletedData = await Data.findOneAndDelete({ contactNo });

    if (!deletedData) {
      return res.status(404).send({ message: 'Data not found' });
    }

    res.status(200).send({ message: 'Data deleted successfully', deletedData });
  } catch (error) {
    res.status(400).send({ message: 'Error deleting data', error });
  }
});


module.exports = router;