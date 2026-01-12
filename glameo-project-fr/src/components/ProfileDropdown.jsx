import { useState,useEffect,useContext } from "react";
import { Menu } from "@headlessui/react";
import { User, Moon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { NotificationContext } from "../context/NotificationContext";
import { AuthContext } from "../context/AuthContext";
import useLogout from "../pages/LogOut";

const ProfileDropdown = () => {
  //use notification 
  const notificationContext = useContext(NotificationContext);
  const notifySuccess = notificationContext?.notifySuccess || (() => {});
  const notifyError = notificationContext?.notifyError || (() => {}); 
  // Use context for logout and userData
  const { user,logout } = useContext(AuthContext);
  const [name,setName] = useState(""); // Replace with user context
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState(""); 
  const [isLoaded, setIsLoaded] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleLogout = useLogout(); // Use the custom logout hook
  

   // Effect to update name when user changes
   useEffect(() => {
    if (user?.name) {
      console.log('Name ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',user.name)
      setName(user.name);
    }
  }, [user]);



  // // Handle logout function
  // const handleLogout = async(e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");
   
  //    const refreshToken = user?.refreshToken
  //   if (!refreshToken) {
  //     notifyError && notifyError("Something went wrong");
  //     // setError("No refresh token found");
  //     localStorage.clear();
  //     return;
  //   }
     
  //   try{
  //      const {status,message} = await logoutUser(refreshToken)
  //      console.log('Logout successful or error',status,message)
  //     if(status){
  //       notifySuccess && notifySuccess(message);
  //       logout();
  //       navigate('/login')
  //     }else{
  //       notifyError && notifyError(message);
  //     }
  //   } catch (err){
  //     notifyError && notifyError(err.message || "Something went wrong");
  //   }
  // };
  




  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="w-10 h-10 flex items-center justify-center bg-lime-400 text-white font-bold rounded-full shadow-md">
      {name ? name.split(" ").slice(0, 2).map(word => word[0].toUpperCase()).join("") : "PR"}
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-200">
        <div className="px-4 py-2 text-gray-800 font-semibold">Hi {name}</div>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 bg-white ${
                active ? "bg-gray-100" : ""
              }`}
            >
              <Moon size={16} />
              Dark
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 bg-white ${
                active ? "bg-gray-100" : ""
              }`}
            >
              <User size={16} />
              My Profile
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button onClick={handleLogout} className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 bg-white ${active ? "bg-gray-100" : ""}`}>
              <LogOut size={16} />Logout</button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ProfileDropdown;

