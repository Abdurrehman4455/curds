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
//Email verification endpoint
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Error during email verification:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;

