const express = require('express');
const router = express.Router();
const Department = require('../models/Department'); // Adjust the path to your Department model

// POST route to add a new department
router.post('/addS', async (req, res) => {
    const { departmentid, departmentname } = req.body; // Destructure department data from the request body
    const newDepartment = new Department({ departmentid, departmentname }); // Create a new Department object

    try {
        await newDepartment.save(); // Save the new department to the database
        res.status(201).send(newDepartment); // Send back the saved department with a 201 status
    } catch (error) {
        res.status(400).send({ error: 'Failed to add department', details: error }); // Send back an error if the operation fails
    }
});
// GET route to fetch all departments
router.get('/departments', async (req, res) => {
    try {
        const departments = await Department.find(); // Fetch all departments from the database
        res.status(200).send(departments); // Send back the departments with a 200 status
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch departments', details: error }); // Send back an error if the operation fails
    }
});

module.exports = router;
