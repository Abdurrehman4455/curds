import React, { useEffect, useState } from 'react';
import CreateButton from '../../Buttons/CreateButton';
import Modal from './Modal';
import Table from '../Table/Table';
import Pagination from './Pagination';
import Department from '../Compoments/Deparment'; // Corrected name
import Departmenttable from '../Compoments/Departmenttable';

const Dashboard = ({ searchResults, isSearching }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]); // Initialize as an empty array
  const [editingData, setEditingData] = useState(null); // Track editing data
  const [currentPage, setCurrentPage] = useState(1); // Keep track of current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [selectedMenu, setSelectedMenu] = useState('Person'); // Track selected sidebar option
  const itemsPerPage = 10; // Set items per page

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Open the modal to add or edit data
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingData(null); // Clear editing data
  };

  // Fetch data from the backend based on current page and menu
  const fetchData = async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`http://localhost:5000/api/data?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      
      const { data, currentPage, totalPages } = await response.json();
  
      // Update the data list
      setDataList(data);
  
      // Set the current page and total pages
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setDataList([]); // Set an empty list in case of error
    }
  };

  // Fetch data when the current page or selected menu changes
  useEffect(() => {
    if (selectedMenu === 'Person') {
      fetchData(currentPage);     // Fetch data for the current page
    }
  }, [currentPage, selectedMenu]);

  // Handle page change in pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);         // Update the current page state
  };

  // Handle form submission for adding or editing data
  const handleFormSubmit = async (data) => {
    // Ensure that all fields, especially departmentId, are filled
    if (!data.name || !data.lastname || !data.contactNo || !data.departmentId) {
      alert('Please fill out all required fields.');
      return;
    }
  
    console.log("Form data to be submitted:", JSON.stringify(data, null, 2));  // Log the form data
  
    try {
      // Send a POST request to the backend to add the data
      const response = await fetch('http://localhost:5000/api/data/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  // Send the form data as JSON
      });
  
      // Handle non-OK response
      if (!response.ok) {
        const errorData = await response.json();  // Get the error response from the backend
        throw new Error(`Failed to add data: ${errorData.error || response.statusText}`);
      }
  
      const responseData = await response.json();  // Parse the response data
      alert('Data added successfully');
      
      // Update the state with the newly added data (uncomment if needed in your flow)
      // setDataList((prevDataList) => [...prevDataList, responseData]);
  
      closeModal();  // Close the modal after successful data addition
    } catch (error) {
      console.error('There has been a problem with your add operation:', error);
      alert('Error adding data: ' + error.message);
    }
  };
  

  // Update function for editing data
  const updateData = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/data/${data.id}`, {
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

      // Update the existing data in the list and ensure prevDataList is an array
      setDataList((prevDataList) => {
        return Array.isArray(prevDataList)
          ? prevDataList.map((item) => (item.contactNo === responseData.contactNo ? responseData : item))
          : [responseData];
      });

      closeModal();
    } catch (error) {
      console.error('There has been a problem with your update operation:', error);
      alert('Error updating data: ' + error.message);
    }
  };

  // Handle editing an entry
  const handleEdit = (data) => {
    setEditingData(data); // Set the data to be edited
    openModal();
  };
  const deleteData = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmDelete) return;

    try {
        // Send the DELETE request to the backend with the _id in the URL
        const response = await fetch(`http://localhost:5000/api/data/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const message = await response.json();
            throw new Error(`Network response was not ok: ${message.message}`);
        }

        alert('Data deleted successfully');

        // Optionally, remove the deleted data from the local state
         setDataList((prevDataList) => prevDataList.filter((item) => item._id !== id));
    } catch (error) {
        console.error('There has been a problem with your delete operation:', error);
        alert(`Error deleting data: ${error.message}`);
    }
};


  return (
    <div className="dashboard-container flex">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'block' : 'hidden'} bg-blue-600 h-screen p-5`}>
        <ul className="text-white space-y-4">
          <li className="cursor-pointer" onClick={() => setSelectedMenu('Person')}>
            Person List
          </li>
          <li className="cursor-pointer" onClick={() => setSelectedMenu('Department')}>
            Department List
          </li>
          <li className="cursor-pointer" onClick={() => setSelectedMenu('Division')}>
            Division List
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content w-full p-5 ${isSidebarOpen ? 'ml-64' : ''}`}>
        <button className="bg-blue-600 text-white px-4 py-2 mb-5" onClick={toggleSidebar}>
          {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button>

        {/* Conditionally render Person Components */}
        {selectedMenu === 'Person' && (
          <>
            <CreateButton name="Add" className="ml-10" openModal={openModal} />
            <Modal
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              onSubmit={handleFormSubmit}
              editingData={editingData} // Pass the editing data to the modal
            />
            <Table
              data={isSearching ? searchResults : dataList} // Fetch the correct page data from the server
              EditClick={handleEdit}
              deleteData={deleteData}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* Add conditional rendering for Department and Division Lists here */}
        {selectedMenu === 'Department' && (
          <div>
            <h2 className="text-2xl font-bold">Department</h2>
            <Department />
            <Departmenttable />
          </div>
        )}
        {selectedMenu === 'Division' && (
          <div>
            <h2>Division List</h2>
            {/* Division list content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
