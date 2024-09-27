const Data = require('../models/Data');
const Department = require('../models/Department');

// Add new data with department selection
exports.addData = async (req, res) => {
  const { name, lastname, address, contactNo, bloodGroup, departmentId } = req.body;

  console.log("Received data:", req.body);

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

    const newData = new Data({
      name,
      lastname,
      address,
      contactNo,
      bloodGroup,
      department: department._id,
      departmentName: department.departmentname
    });

    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send({ error: 'Server error', details: error.message });
  }
};

// Fetch paginated data with populated department field
exports.getData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalEntries = await Data.countDocuments();
    const data = await Data.find()
      .populate('department', 'departmentname')
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalEntries / limit);

    res.status(200).json({
      data,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete data by ID
exports.deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    console.log('Received id for deletion:', id);
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
};

// Update data by ID
exports.updateData = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, address, contactNo, bloodGroup, departmentId } = req.body;

  try {
    const updatedData = await Data.findByIdAndUpdate(
      id,
      { name, lastname, address, contactNo, bloodGroup, department: departmentId },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Error updating data', error: error.message });
  }
};

// Search data
exports.searchData = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(200).json([]);
    }

    const matchingDepartments = await Department.find({ departmentname: { $regex: q, $options: 'i' } }).select('_id');
    const departmentIds = matchingDepartments.map(dept => dept._id);

    const searchResults = await Data.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { departmentName: { $regex: q, $options: 'i' } },
        { department: { $in: departmentIds } }
      ]
    }).populate('department', 'departmentname');

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Error fetching search results', error: error.message });
  }
};
