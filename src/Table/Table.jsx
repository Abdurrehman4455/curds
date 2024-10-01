import React, { useState } from 'react';
import Attendance from '../Compoments/Attendance'; // Ensure the path is correct

const Table = ({ data, EditClick, deleteData }) => {
  const [selectedPerson, setSelectedPerson] = useState(null); // State to track selected person
  const [attendanceRecords, setAttendanceRecords] = useState(null); // State to track attendance data

  // Function to fetch attendance data
  const fetchAttendanceData = async (personId) => {
    try {
      const response = await fetch(`http://localhost:5000/attendance/personId`);
      if (!response.ok) {
        throw new Error('Error fetching attendance data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
      return null;
    }
  };

  // Function to handle viewing attendance records
  const handleViewAttendance = async (personId) => {
    try {
      const records = await fetchAttendanceData(personId);
      setAttendanceRecords(records);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  // Function to close attendance view
  const handleCloseAttendance = () => {
    setSelectedPerson(null);
    setAttendanceRecords(null); // Clear attendance records when closing the modal
  };

  // Handle case when data is undefined or empty
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="text-center">
          <tr className="bg-blue-700 text-white">
            <th className="py-2 px-4 text-center">Name</th>
            <th className="py-2 px-4 text-center">Lastname</th>
            <th className="py-2 px-4 text-center hidden sm:table-cell">Address</th>
            <th className="py-2 px-4 text-center">Contact No</th>
            <th className="py-2 px-4 text-center">Blood Group</th>
            <th className="py-2 px-4 text-center">Department</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="py-2 px-4">{item.name || 'N/A'}</td>
              <td className="py-2 px-4">{item.lastname || 'N/A'}</td>
              <td className="py-2 px-4 hidden sm:table-cell">{item.address || 'N/A'}</td>
              <td className="py-2 px-4">{item.contactNo || 'N/A'}</td>
              <td className="py-2 px-4">{item.bloodGroup || 'N/A'}</td>
              <td className="py-2 px-4">{item.department?.departmentname || 'N/A'}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-green-500 text-white py-1 px-2 rounded mr-2 hover:bg-green-700"
                  onClick={() => setSelectedPerson(item)}
                  aria-label={`Mark Attendance for ${item.name || 'entry'}`}
                >
                  Mark Attendance
                </button>
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg-yellow-700"
                  onClick={() => EditClick(item)}
                  aria-label={`Edit ${item.name || 'entry'}`}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                  onClick={() => deleteData(item._id)}
                >
                  Delete
                </button>
                <button
                  className="ml-3 p-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600"
                  onClick={() => handleViewAttendance(item._id)}
                >
                  View Attendance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditionally render the Attendance component */}
      {selectedPerson && (
        <Attendance
          person={selectedPerson}
          onClose={handleCloseAttendance}
        />
      )}

      {/* Conditionally render attendance details */}
      {attendanceRecords && (
        <div className="mt-4 p-4 bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Attendance Details for {selectedPerson?.name}</h3>
          <p>Total Present: {attendanceRecords.presentCount}</p>
          <p>Total Absent: {attendanceRecords.absentCount}</p>
          <p>Total Classes: {attendanceRecords.totalClasses}</p>
        </div>
      )}
    </div>
  );
};

export default Table;
