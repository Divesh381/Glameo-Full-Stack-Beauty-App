import { useState } from "react";
import { FaUserCog, FaRegFileAlt, FaCogs, FaBars, FaTimes, FaChevronDown, FaChevronRight,FaUserTie,FaUser } from "react-icons/fa";
import UserManagement from "../pages/AdminPages/UserManagement";
import BeauticianUserManagement from "./AdminPages/BeauticianManagement";
import ServiceManagement from "./AdminPages/serviceManagement/ServiceManagent";

const Sidebar = ({ isOpen, toggleSidebar, setActivePage,activePage }) => {
  const [expandedMenu, setExpandedMenu] = useState(null); // Track submenu state

  // Toggle submenu
  const toggleSubMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <div className={`bg-blue-900 text-white h-screen p-1 transition-all duration-300 shadow-lg ${isOpen ? "w-60" : "w-16"} flex flex-col`}>
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button className="text-white hover:bg-blue-700 p-2 rounded-full transition" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-2 ml-2">

        {/* User Management Button */}
          <div>
            <button
              className="flex items-center justify-between w-full text-gray-200 hover:text-white hover:bg-blue-700 p-3 rounded-lg transition-all"
              onClick={() => toggleSubMenu("usermanagement")}
            >
              <div className="flex items-center space-x-3">
                <FaUserCog className="text-xl" />
                {isOpen && <span className="font-semibold">User Management</span>}
              </div>
              {isOpen && (expandedMenu === "usermanagement" ? <FaChevronDown /> : <FaChevronRight />)}
            </button>


            {expandedMenu === "usermanagement" && (
              <div className="rounded-lg mt-1 overflow-hidden transition-all">
                <SidebarItem 
                icon={<FaUser className="text-sm" />} 
                text="Customer User" 
                setActivePage={setActivePage} 
                page="customeruser" 
                isActive={activePage === "customeruser"} 
                isOpen={isOpen} 
                className={`w-full p-3 flex items-center space-x-3 transition-all text-sm ${
                  activePage === "customeruser" ? "bg-blue-700 text-white font-semibold" : "text-gray-200 hover:text-white hover:bg-blue-500"
                }`}
              />

                <SidebarItem 
                  icon={<FaUserTie className="text-sm"/>} 
                  text="Beauticians User" 
                  setActivePage={setActivePage} 
                  page="beauticiansuser" 
                  isActive={activePage === "beauticiansuser"} 
                  isOpen={isOpen} 
                  className={`w-full p-3 flex items-center space-x-3 transition-all text-sm ${
                    activePage === "beauticiansuser" ? "bg-blue-700 text-white font-semibold" : "text-gray-200 hover:text-white hover:bg-blue-500"
                  }`}
                />
              </div>
            )}
          </div>

        {/* Other Menu Items */}
        <SidebarItem icon={<FaRegFileAlt />} text="Content Management" setActivePage={setActivePage} page="content" isOpen={isOpen} />
        <SidebarItem icon={<FaCogs />} text="Service Management" setActivePage={setActivePage} page="services" isOpen={isOpen} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, isOpen, setActivePage, page }) => {
  return (
    <button
      className="flex items-center space-x-3 text-gray-200 hover:text-white hover:bg-blue-700 p-3 rounded-lg transition-all w-full text-left"
      onClick={() => setActivePage(page)}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {isOpen && <span className="font-semibold">{text}</span>}
    </button>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("home"); // Default content

  // Render content dynamically based on `activePage`
  let content;
  if (activePage === "usermanagement") {
    content = <UserManagement />;
  } else if (activePage === "customeruser") {
    content = <UserManagement />;
  } else if (activePage === "beauticiansuser") {
    content =  <BeauticianUserManagement />;;
  } else if (activePage === "content") {
    content = <div>Content Management Page</div>;
  } else if (activePage === "services") {
    content = <ServiceManagement/>;
  } else {
    content = <div>Main Content Area</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} setActivePage={setActivePage} activePage={activePage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="bg-gray-200 p-4 text-center text-xl font-bold shadow">GLAMEO BEAUTY DASHBOARD</div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-auto p-3 bg-white shadow rounded-md">{content}</div>
      </div>
    </div>
  );
};

export default Dashboard;
