import React, { useState, useEffect } from 'react';

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch department data from backend
  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/Department/departments'); // Adjust the URL to match your backend route
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setDepartments(data); // Set the fetched data to the state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading once the data is fetched or an error occurs
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Conditionally render loading, error, or department list
  if (loading) return <p className="text-center text-gray-500">Loading departments...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Department List</h2>
      {departments.length === 0 ? (
        <p className="text-gray-500">No departments available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 font-semibold text-gray-600">Department ID</th>
                <th className="py-2 px-4 font-semibold text-gray-600">Department Name</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept._id} className="border-t border-gray-200">
                  <td className="py-2 px-4 text-gray-700">{dept.departmentid}</td>
                  <td className="py-2 px-4 text-gray-700">{dept.departmentname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DepartmentsList;
