import React, { useState, useEffect } from 'react';

const Modal = ({ isModalOpen, closeModal, onSubmit, editingData }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    address: '',
    contactNo: '',
    bloodGroup: ''
  });

  useEffect(() => {
    if (editingData) {
      setFormData(editingData); // Populate form with existing data
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
    onSubmit(formData);
    setFormData({
      name: '',
      lastname: '',
      address: '',
      contactNo: '',
      bloodGroup: ''
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#C2D8D3] w-full max-w-lg mx-4 sm:mx-auto rounded-lg p-6 text-white">
        <div className="flex justify-end">
          <span className="cursor-pointer text-2xl" onClick={closeModal}>&times;</span>
        </div>
        <p className="text-[20px] text-center font-bold mb-4">INFORMATION</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-bold text-[18px] mb-2">FirstName</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="w-full rounded-lg text-black p-2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastname" className="block text-white font-bold text-[18px] mb-2">Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="lastname"
              className="w-full rounded-lg text-black p-2"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-white font-bold text-[18px] mb-2">Address</label>
            <input
              type="text"
              name="address"
              placeholder="address"
              className="w-full rounded-lg text-black p-2"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contactNo" className="block text-white font-bold text-[18px] mb-2">Contact no</label>
            <input
              type="text"
              name="contactNo"
              placeholder="contactNo"
              className="w-full rounded-lg text-black p-2"
              value={formData.contactNo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bloodGroup" className="block text-white font-bold text-[18px] mb-2">Blood group</label>
            <input
              type="text"
              name="bloodGroup"
              placeholder="bloodGroup"
              className="w-full rounded-lg text-black p-2"
              value={formData.bloodGroup}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
