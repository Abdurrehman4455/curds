import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Compoments/Nav'
import Login from "./Compoments/Login"
import Register from "./Compoments/Regiter"
import Dashboard from './Compoments/Dashboard';

function App() {
 

  return (
    
    
    <Router>
     
     <Nav/>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        
      </Routes>
    </Router>
    
   
    
  )
}

export default App
