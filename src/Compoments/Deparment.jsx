import React, { useState } from 'react';

const Department = () => {
  const [formData, setFormData] = useState({
    departmentid: '',
    departmentname: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/Department/addS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);

      alert('Department added successfully');

      // Optionally update local state or UI here
      // e.g., setDataList((prevDataList) => [...prevDataList, responseData]);

      // Close modal (if applicable)
      // closeModal();

    } catch (error) {
      console.error('There has been a problem with your add operation:', error);
      alert('Error adding department: ' + error.message);
    }
  };

  return (
    <div className="w-[40rem] h-[35rem] bg-gray-100 rounded-lg border-[6px] border-blue-500 border-solid flex-col items-center">
      <h1 className="font-bold text-2xl flex justify-center">DEPARTMENT DETAILS</h1>
      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-bold text-xl">Department ID</label>
            <input
              type="text"
              name="departmentid"
              placeholder="Department ID"
              value={formData.departmentid}
              onChange={handleChange}
              className="rounded-lg border-[2px] border-black ml-10"
            />
          </div>
          <div className="mt-4">
            <label className="font-bold text-xl">Department Name</label>
            <input
              type="text"
              name="departmentname"
              placeholder="Department Name"
              value={formData.departmentname}
              onChange={handleChange}
              className="rounded-lg border-[2px] border-black ml-4"
            />
          </div>
          <div className="flex justify-center mt-4 space-x-3">
            <button type="submit" className="mt-4 text-center rounded-lg bg-blue-500 px-2 py-2 text-white font-bold">
              ADD DEPARTMENT
            </button>
            <button type="submit" className="mt-4 text-center rounded-lg bg-yellow-400 px-2 py-2 text-white font-bold">
              EDIT DEPARTMENT
            </button>
            <button type="submit" className="mt-4 text-center rounded-lg bg-red-500 px-2 py-2 text-white font-bold">
              Delete DEPARTMENT
            </button>
            {/* Additional buttons for edit and delete functionality */}
          </div>
        </form>
      
      </div>
      
    </div>
  );
};

export default Department;
