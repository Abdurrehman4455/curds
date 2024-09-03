
import React, { useEffect, useState } from 'react';
import CreateButton from '../../Buttons/CreateButton';
import Modal from './Modal';
import Table from '../Table/Table';
import Pagination from './Pagination';

const Dashboard = ({ searchResults, isSearching }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [editingData, setEditingData] = useState(null); // Track editing data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // Change this to your desired number of items per page

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingData(null); // Clear editing data when closing the modal
  };

  const fetchData = async (page = 1, limit = itemsPerPage) => {
    try {
      const response = await fetch(`http://localhost:5000/api/data?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const { data, currentPage, totalPages } = await response.json();
      setDataList(data);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setDataList([]); // Set as empty array in case of error
    }
  };

  useEffect(() => {
    fetchData(currentPage); // Fetch data when the component mounts or currentPage changes
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };
  const currentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataList.slice(startIndex, endIndex);
  };

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
      <Table 
        data={isSearching ? searchResults : dataList} // Adjust data prop based on search state
        EditClick={handleEdit} 
        deleteData={deleteData} 
      />
      <Pagination
       currentPage={currentPageData}
       totalPages={totalPages}
       onPageChange={handlePageChange}/>
    </div>
  );
};

export default Dashboard;
