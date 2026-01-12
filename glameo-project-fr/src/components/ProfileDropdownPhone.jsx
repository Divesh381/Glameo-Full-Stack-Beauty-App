import { Fragment,useEffect, useState,useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { User, Moon, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import useLogout from "../pages/LogOut";

const ProfileDropdownPhone = () => {
  const { user,logout } = useContext(AuthContext);
  const [userName] = useState("Divesh"); // Replace with user context
  const navigate = useNavigate();
  const [name,setName] = useState(""); // Replace with user context
  const handleLogout = useLogout(); // Use the custom logout 

   // Effect to update name when user changes
     useEffect(() => {
      if (user?.name) {
        console.log('Name Phone ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',user.name)
        setName(user.name);
      }
    }, [user]);
  
  return (
    <div className="w-full">
      <Menu as="div" className="relative">
        {/* Only One Menu.Button */}
        <Menu.Button className="flex items-center gap-2 w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
          <div className="w-8 h-8 flex items-center justify-center bg-lime-400 text-white font-bold rounded-full shadow-md">
          {name ? name.split(" ").slice(0, 2).map(word => word[0].toUpperCase()).join("") : "PR"}
          </div>
          <span className="text-sm font-medium">Hi {name}</span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none z-50">
            <div className="py-2">
              <Menu.Item>
                {({ active }) => (
                  <button className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 bg-white ${active ? "bg-gray-100" : ""}`}>
                    <User size={16} />
                    My Profile
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 bg-white ${active ? "bg-gray-100" : ""}`}>
                    <Moon size={16} />
                    Dark
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button onClick={handleLogout} className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 bg-white ${active ? "bg-gray-100" : ""}`}>
                    <LogOut size={16} />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileDropdownPhone;
