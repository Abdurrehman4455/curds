import React, { useState } from 'react';

const Search = ({ onSearch,onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Update state when input changes
  const handleInputChange = () => {
    
    setSearchTerm(newSearchTerm);
    if (newSearchTerm === '') {
      onClear(); // Call onClear to reset to default data when input is cleared
    }

    
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Check if searchTerm is not empty before making the fetch request
      if (!searchTerm) {
        console.warn('Search term is empty');
        return; // Exit early if search term is empty
      }

      // Include the search term in the fetch request
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      onSearch(data); // Pass the fetched data to the parent component
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className='flex mr-[10rem]'>
  <form onSubmit={handleSubmit} className='flex w-full'>
    <input
      type='text'
      name='search'
      placeholder='search'
      className='w-full rounded-full '
      value={searchTerm}
      onChange={handleInputChange} // Handle input changes
    />
    <button
      type='submit'
      className='ml-2 p-2 rounded-full bg-blue-500 text-white'
      
    >
      Search
    </button>
  </form>
</div>

  );
};

export default Search;
