
const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// POST route to add a new department
router.post('/addS', async (req, res) => {
    const { departmentid, departmentname } = req.body;
    const newDepartment = new Department({ departmentid, departmentname });

    try {
        await newDepartment.save();
        res.status(201).send(newDepartment);
    } catch (error) {
        res.status(400).send({ error: 'Failed to add department', details: error });
    }
});

// GET route to fetch all departments
router.get('/departments', async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch departments', details: error });
    }
});

// PUT route to update department by departmentid
router.put('/update/:departmentid', async (req, res) => {
    const { departmentid } = req.params;
    const { departmentname } = req.body;

    try {
        const updatedDepartment = await Department.findOneAndUpdate(
            { departmentid },
            { departmentname },
            { new: true }
        );

        if (!updatedDepartment) {
            return res.status(404).send({ error: 'Department not found' });
        }

        res.status(200).json(updatedDepartment);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update department', details: error });
    }
});
router.delete('/delete/:departmentid', async (req, res) => {
    const { departmentid } = req.params;

    try {
        const deletedDepartment = await Department.findOneAndDelete({ departmentid });

        if (!deletedDepartment) {
            return res.status(404).send({ error: 'Department not found' });
        }

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete department', details: error });
    }
});


module.exports = router;
