import React from 'react';

const Table = ({ data, EditClick, deleteData }) => {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Lastname</th>
            <th className="py-2 px-4 text-left hidden sm:table-cell">Address</th>
            <th className="py-2 px-4 text-left hidden md:table-cell">Contact No</th>
            <th className="py-2 px-4 text-left hidden lg:table-cell">Blood Group</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-black font-bold text-center border-gray-400 border-[1px]">
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.lastname}</td>
              <td className="py-2 px-4 hidden sm:table-cell">{item.address}</td>
              <td className="py-2 px-4 hidden md:table-cell">{item.contactNo}</td>
              <td className="py-2 px-4 hidden lg:table-cell">{item.bloodGroup}</td>
              <td className="py-2 px-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-center">
                <button
                  className="bg-yellow-500 rounded-lg px-4 py-2 text-white"
                  onClick={() => EditClick(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 rounded-lg px-4 py-2 text-white"
                  onClick={() => deleteData(item.contactNo)}
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
