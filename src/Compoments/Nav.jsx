
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Search from "./Search";

const Nav = ({ isAuthenticated, SetisAuthenticated, onSearch, onClear }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    SetisAuthenticated(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-around bg-blue-700 w-full h-[80px] items-center ">
      <div className="text-white w-[30%] font-bold">
        Curd
      </div>
      {isAuthenticated && location.pathname === '/dashboard' && (
        <div className="mr-10">
          <Search onSearch={onSearch} onClear={onClear} />
        </div>
      )}
      <div className="lg:hidden md:block max-sm:block flex items-center">
        <button 
          onClick={toggleMenu} 
          className="text-white focus:outline-none"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <div className={`text-white font-bold lg:block ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <nav className="space-x-3 max-sm:flex-col">
          {!isAuthenticated ? (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          ) : (
            <>
              <Link to='/dashboard'>Dashboard</Link>
              <button 
                onClick={handleLogout} 
                className="text-white rounded-lg bg-red-600 p-4"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Nav;
