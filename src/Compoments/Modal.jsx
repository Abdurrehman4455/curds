import React, { useState, useEffect } from 'react';

const Modal = ({ isModalOpen, closeModal, onSubmit, editingData }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    address: '',
    contactNo: '',
    bloodGroup: '',
    departmentId: '' // Added department field
  });
  
  const [departments, setDepartments] = useState([]);  // Store fetched departments

  // Fetch departments from the backend
  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/Department/departments'); // Adjust the URL to match your backend route
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setDepartments(data); // Set the fetched data to the state
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDepartments();  // Fetch departments when the component mounts
  }, []);

  useEffect(() => {
    if (editingData) {
      setFormData(editingData); // Populate form with existing data when editing
    }
  }, [editingData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data, including departmentId, to parent onSubmit handler
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">{editingData ? 'Edit Data' : 'Create Data'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
          <input 
            type="text" 
            name="lastname" 
            value={formData.lastname} 
            onChange={handleChange} 
            placeholder="Lastname" 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            placeholder="Address" 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
          <input 
            type="text" 
            name="contactNo" 
            value={formData.contactNo} 
            onChange={handleChange} 
            placeholder="Contact Number" 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
          <input 
            type="text" 
            name="bloodGroup" 
            value={formData.bloodGroup} 
            onChange={handleChange} 
            placeholder="Blood Group" 
            className="w-full p-2 border border-gray-300 rounded" 
            required 
          />
  
          {/* Department dropdown */}
          <select 
            name="departmentId" 
            value={formData.departmentId} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            required
          >
            <option value="">Select Department</option>
            {departments.map(department => (
              <option key={department._id} value={department._id}>
                {department.departmentname}
              </option>
            ))}
          </select>
  
          <div className="flex justify-between mt-4">
            <button 
              type="submit" 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button 
              type="button" 
              onClick={closeModal} 
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
