import { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; 
import { FaUserCircle,FaShoppingCart } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";  
import ProfileDropdownPhone from "./ProfileDropdownPhone"


const Navbar = ({userType}) => {
  console.log('Navbar - userType:', userType);
  const [isOpen, setIsOpen] = useState(false);
  

  // Conditionally render routes based on userType
  const shouldRenderDashboard = userType === "admin" ;
  const shouldRenderCart = userType === "customer" ;
  const shouldRenderBeauticianDashboard= userType === "freelancer" ;

  // Check if current page is Cart
  const isCartPage = location.pathname === "/cart"; 

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">MySite</Link>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden block text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/services" className="hover:text-gray-300">Services</Link>
          {shouldRenderBeauticianDashboard && (<Link to="/beauticiandashboard" className="hover:text-gray-300">BeauticianDashboard</Link>)}
          {shouldRenderDashboard && (<Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>)}

          {/* Cart Icon (Only for Customers) */}
          <Link to="/cart" className="p-2 rounded-full hover:bg-gray-700 transition flex items-center">
              <FaShoppingCart className="w-5 h-5 text-white mr-2" />Cart
            </Link>
        

          {/* Login Icon (Desktop) */}
          {/* Show ProfileDropdown if logged in, otherwise show FaUserCircle */}

          {!isCartPage && (
            userType ? (
              <ProfileDropdown />
            ) : (
              <Link to="/login" className="p-2 rounded-full hover:bg-gray-700 transition flex items-center">
                <FaUserCircle className="w-6 h-6 text-white mr-2" />Login
              </Link>
            )
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-blue-700 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="p-5 flex flex-col space-y-4">
          <button
            className="text-white text-right"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <Link to="/" className="text-white text-lg hover:bg-blue-800 p-2 rounded" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="text-white text-lg hover:bg-blue-800 p-2 rounded" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/services" className="text-white text-lg hover:bg-blue-800 p-2 rounded" onClick={() => setIsOpen(false)}>Services</Link>

          {shouldRenderBeauticianDashboard &&(
            <Link to="/beauticiandashboard" className="text-white text-lg hover:bg-blue-800 p-2 rounded" onClick={() => setIsOpen(false)}>BeauticianDashboard</Link>
          )}

          {shouldRenderDashboard &&(
            <Link to="/dashboard" className="text-white text-lg hover:bg-blue-800 p-2 rounded" onClick={() => setIsOpen(false)}>Dashboard</Link>
          )}
          {/* Cart Option for Customers (Mobile) */}
          <Link to="/cart" className="text-white text-lg hover:bg-blue-800 p-2 rounded flex items-center" onClick={() => setIsOpen(false)}>
              <FaShoppingCart className="w-5 h-5 mr-2" /> Cart
            </Link>

          {/* Show ProfileDropdownPhone if logged in, otherwise show FaUserCircle */}
          {/* hadle here with different method for mobile */}
          <div className="text-white p-2">

            {!isCartPage && (
            userType ? (
               <ProfileDropdownPhone />
            ) : (
              <Link to="/login" className="text-white text-lg hover:bg-blue-800 p-2 rounded flex items-center" onClick={() => setIsOpen(false)}>
                <FaUserCircle className="w-5 h-5 mr-2" /> Login
              </Link>)
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
