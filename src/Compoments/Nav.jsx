import { useState } from "react";
 import { Link } from "react-router-dom"
const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  return (
    <div className="flex justify-around  bg-blue-700 w-full h-[80px] items-center ">
     <div className="text-white w-[30%]  font-bold">
          Curd
     </div>
     <div className="lg:hidden md:block max-sm:block  flex items-center">
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
     <div className={` text-white font-bold   lg:block  ${isMenuOpen?'block':'hidden'} lg:block`}>
          <nav  className="space-x-3 l max-sm:flex-col">
          <Link to='/login'>Login</Link>
           
          <Link to='/Register'>Register</Link>
        </nav>
     </div>
    </div>
    
  )
}

export default Nav
