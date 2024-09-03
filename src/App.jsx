
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from './Compoments/Nav';
import Login from "./Compoments/Login";
import Register from "./Compoments/Regiter";
import Dashboard from './Compoments/Dashboard';
import VerifyEmail from './Compoments/VerifyEmail';

function App() {
  const [isAuthenticated, SetisAuthenticated] = useState(false);
  const [dataList, setDataList] = useState([]); // State for full data list
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [isSearching, setIsSearching] = useState(false); // Track if searching

  useEffect(() => {
    const token = localStorage.getItem('token');
    SetisAuthenticated(!!token);
  }, []);

  const handleSearch = (data) => {
    console.log('Search results from API:', data);
    setSearchResults(data);
    setIsSearching(true); // Set search state to active
  };

  const clearSearch = () => {
    console.log('Clearing search results');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <Router>
      <Nav 
        isAuthenticated={isAuthenticated} 
        SetisAuthenticated={SetisAuthenticated} 
        onSearch={handleSearch} 
        onClear={clearSearch} 
      />
      <Routes>
        <Route path='/login' element={<Login SetAuthenticated={SetisAuthenticated} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={isAuthenticated ? (
          <Dashboard 
            searchResults={searchResults} 
            isSearching={isSearching} 
          />
        ) : (
          <Login setisAuthenticated={SetisAuthenticated} />
        )} />
        <Route path='/verify-email' element={<VerifyEmail SetAuthenticated={SetisAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
