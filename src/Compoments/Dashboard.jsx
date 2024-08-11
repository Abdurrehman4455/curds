import React, { useEffect, useState } from 'react';
import CreateButton from '../../Buttons/CreateButton';
import Modal from './Modal';
import Table from '../Table/Table';
import axios from 'axios';


const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [editingData, setEditingData] = useState(null); // Track editing data

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingData(null); // Clear editing data when closing the modal
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data...');
      try {
        const response = await fetch('http://localhost:5000/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setDataList(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  const updateData = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/data/${data.contactNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);

      alert('Data updated successfully');


      setDataList(prevDataList =>
        prevDataList.map(item => item.contactNo === responseData.contactNo ? responseData : item)
      );

      closeModal();
    } catch (error) {
      console.error('There has been a problem with your update operation:', error);
      alert('Error updating data: ' + error.message);
    }
  };
  

  const handleFormSubmit = async (data) => {
    if (editingData) {
      await updateData(data); // Call the updateData function if editing
    }
     else {
      try {
        const response = await fetch('http://localhost:5000/api/data/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }

        const responseData = await response.json();
        console.log('Response data:', responseData);

        alert('Data added successfully');

        // Add the new data to the list
        setDataList(prevDataList => [...prevDataList, responseData]);

        closeModal();
      } catch (error) {
        console.error('There has been a problem with your add operation:', error);
        alert('Error adding data: ' + error.message);
      }
    }
  };

  const handleEdit = (data) => {
    setEditingData(data); // Set the data to be edited
    openModal();
  };
  const deleteData = async (contactNo) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/data/${contactNo}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      alert('Data deleted successfully');

      // Remove the deleted data from the list
      setDataList(prevDataList => prevDataList.filter(item => item.contactNo !== contactNo));
    } catch (error) {
      console.error('There has been a problem with your delete operation:', error);
      alert('Error deleting data: ' + error.message);
    }
  };


  return (
    <div>
      <CreateButton name="Add" className="ml-10" openModal={openModal} />
      <Modal 
        isModalOpen={isModalOpen} 
        closeModal={closeModal} 
        onSubmit={handleFormSubmit}
        editingData={editingData} // Pass the editing data to the modal
      />
      <Table data={dataList} EditClick={handleEdit} deleteData={deleteData} />
    </div>
  );
};

export default Dashboard;
