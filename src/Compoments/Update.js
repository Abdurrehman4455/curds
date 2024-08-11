const updateData = async (formData, editingData, setDataList, closeModal) => {
    try {
      const response = await fetch(`http://localhost:5000/api/data/${editingData.contactNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
  
      const responseData = await response.json();
      console.log('Updated data:', responseData);
      alert('Data updated successfully');
  
      setDataList(prevDataList => 
        prevDataList.map(data => data.contactNo === responseData.contactNo ? responseData : data)
      ); // Update the state with the new data
      closeModal(); // Close the modal on successful submission
    } catch (error) {
      console.error('There has been a problem with your update operation:', error);
      alert('Error updating data');
    }
  };
  