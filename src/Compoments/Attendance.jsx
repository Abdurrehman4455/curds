import React, { useState } from 'react';

const Attendance = ({ person, onClose }) => {
  const [status, setStatus] = useState('Present');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/attendance', { // Correct backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personId: person._id,
          date,
          status,
        }),
      });
  
      if (response.ok) {
        alert('Attendance marked successfully');
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error marking attendance:', errorData);
        alert('Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance');
    }
  };
  

  return (
    // Modal background
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      {/* Modal content */}
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Mark Attendance for {person.name} {person.lastname}
        </h2>
        
        {/* Date input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Status select */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
