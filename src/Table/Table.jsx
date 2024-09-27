import React from 'react';

const Table = ({ data, EditClick, deleteData }) => {
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
              {/* Ensure department or departmentname is handled properly */}
              <td className="py-2 px-4">{item.department?.departmentname || 'N/A'}</td>
              <td className="py-2 px-4">
                <button 
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 hover:bg--700" 
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
