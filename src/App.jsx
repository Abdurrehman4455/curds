import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from './Compoments/Nav'
import Login from "./Compoments/Login"
import Register from "./Compoments/Regiter"
import Dashboard from './Compoments/Dashboard';
import VerifyEmail from './Compoments/VerifyEmail';

function App() {
  const[isAuthenticated,SetisAuthenticated]=useState(false);
  useEffect(()=>{
    const token=localStorage.getItem('token');
    SetisAuthenticated(!!token);
    

  },[]);
 

  return (
    
    
    <Router>
     
     <Nav isAuthenticated={isAuthenticated} SetisAuthenticated={SetisAuthenticated}/>
      <Routes>
        <Route path='/login' element={<Login SetAuthenticated={SetisAuthenticated}/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Login setisAuthenticated={SetisAuthenticated} />} />
        <Route path="/verify-email" component={<VerifyEmail/>} />
        
        
      </Routes>
    </Router>
    
   
    
  )
}

export default App
