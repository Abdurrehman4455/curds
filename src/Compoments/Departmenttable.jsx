import React, { useState, useEffect } from 'react';

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState({ departmentid: '', departmentname: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Function to fetch department data from backend
  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/Department/departments');
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle edit button click and open modal
  const handleEditClick = (department) => {
    setEditData(department); // Set the data to be edited
    setIsEditModalOpen(true); // Open the modal
  };

  // Handle change in input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for editing department
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/Department/update/${editData.departmentid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ departmentname: editData.departmentname }),
      });
      if (!response.ok) {
        throw new Error('Failed to update department');
      }
      await response.json();
      setIsEditModalOpen(false); // Close the modal after success
      fetchDepartments(); // Refresh the department list
    } catch (error) {
      alert('Error updating department: ' + error.message);
    }
  };

  // Handle delete button click
  const handleDeleteClick = async (departmentid) => {
    const confirmed = window.confirm('Are you sure you want to delete this department?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/Department/delete/${departmentid}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete department');
      }

      await response.json();
      fetchDepartments(); // Refresh the department list after deletion
    } catch (error) {
      alert('Error deleting department: ' + error.message);
    }
  };

  if (loading) {
    return <p>Loading departments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.departmentid} className="text-center">
              <td className="py-2 px-4 border-b">{department.departmentid}</td>
              <td className="py-2 px-4 border-b">{department.departmentname}</td>
              <td className="py-2 px-4 border-b flex justify-center space-x-2">
                <button
                  onClick={() => handleEditClick(department)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(department.departmentid)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Department</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Department Name</label>
                <input
                  type="text"
                  name="departmentname"
                  value={editData.departmentname}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsList;
