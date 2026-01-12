// export default Signup;
import { useState,useContext } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createCustomerUser } from "../services/authService";
import { NotificationContext } from "../context/NotificationContext";

const Signup = () => {
  ////use notification 
  const notificationContext = useContext(NotificationContext);
  const notifySuccess = notificationContext?.notifySuccess || (() => {});
  const notifyError = notificationContext?.notifyError || (() => {});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    name: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); 
    console.log("Signup Data: ", formData);

    // Mapping the formData to match the API's expected payload format
    const customerData = {
      customerId: "",
      name: formData.name,
      email: formData.email,
      password: formData.password,
      mobileNo: formData.mobileNo,
    };

    try {
      // Calling the createCustomerUser API function
      const {status,message}= await createCustomerUser(customerData);
      
      if (status){
        notifySuccess(message)
        setLoading(false);
        navigate("/login");
      }
      else{
        notifyError(message);
      }
    } catch (err) {
      notifyError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#6A11CB] to-[#2575FC]">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Signup</h2>
        <form onSubmit={handleSignup}>
          {/* First Name and in the same line */}
          <div className="mb-4">
              <label className="block text-white mb-1">Full Name</label>
              <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
                <FaUser className="text-white mr-2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-none focus:outline-none text-white placeholder-white placeholder:text-sm"
                  
                />
              </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-white mb-1">Email</label>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
              <FaEnvelope className="text-white mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-white placeholder-white placeholder:text-sm"
                
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-white mb-1">Password</label>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
              <FaLock className="text-white mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-white placeholder-white placeholder:text-sm"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-white mb-1">Phone Number</label>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
              <FaPhone className="text-white mr-2" />
              <input
                type="tel"  
                name="mobileNo"
                placeholder="Enter phone number"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full bg-transparent border-none focus:outline-none text-white placeholder-white placeholder:text-sm"
              />
            </div>
          </div>

          {/* Signup Button */}
          <button type="submit" className="w-full bg-white text-blue-600 py-2 rounded-lg font-bold hover:bg-opacity-80">
            Signup
          </button>

          {/* Already have an account */}
          <p className="text-center text-white mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-200 underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

