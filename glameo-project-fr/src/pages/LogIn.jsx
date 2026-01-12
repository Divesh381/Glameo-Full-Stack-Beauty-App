import { useState,useEffect,useContext } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import { loginUsers } from "../services/authService"; // Import API function 
import  {AuthContext}  from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";


const Login = () => {

  //use notification 
  const notificationContext = useContext(NotificationContext);
  const notifySuccess = notificationContext?.notifySuccess || (() => {});
  const notifyError = notificationContext?.notifyError || (() => {}); 
  // Use context for login
  const { login } = useContext(AuthContext); 
  const [userLoginId, setUserLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; 
    setIsSubmitting(true);
    
    try {
      const {status,message,data} = await loginUsers(userLoginId, password)
      console.log('status',status)
      console.log('message',message)
      console.log('data',data.data)

      if (status) {
        const userData = {
          data:data.data
        };              
        //Update global state manage using AuthContext
        login(userData);

        notifySuccess && notifySuccess(message);
        if (rememberMe) {
          localStorage.setItem("rememberMe", true);
          notifySuccess(message)
        } else {
          localStorage.removeItem("rememberMe");
        }
        navigate("/");
      } else {
        notifyError && notifyError(message);
      }
    } catch (err) {
      notifyError && notifyError(err.message || "Something went wrong");
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Glameo Beauty</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 relative">
            <label className="block text-white mb-1">Email</label>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
              <FaUser className="text-white mr-2" />
              <input
                type="email"
                className="w-full bg-transparent border-none focus:outline-none text-white placeholder-white"
                placeholder="Enter your email"
                value={userLoginId}
                onChange={(e) => setUserLoginId(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="block text-white mb-1">Password</label>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2">
              <FaLock className="text-white mr-2" />
              <input
                type="password"
                className="w-full bg-transparent border-none focus:outline-none text-white placeholder-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Forgot Password Link */}
        <div className="flex justify-between text-sm text-blue-200 mt-3">
          <span
            className=" cursor-pointer hover:text-blue-300"
            onClick={() => navigate("/mobileotplogin")}
          >
            Sign in using mobile OTP
          </span>
          <span
            className="underline cursor-pointer hover:text-blue-300"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>
        </div>

          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="text-white text-sm">Remember me</label>
          </div>
          {/* Sign in Button */}
          <button 
            type="submit" 
            className={`w-full py-2 rounded-lg font-bold hover:bg-opacity-80 ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-white text-blue-600"
            }`} 
            disabled={isSubmitting}  // Disable button while submitting
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Signup Button */}
          <p className="text-center text-white mt-4">
            Don't have an account? 
            <span
              className="text-blue-200 underline cursor-pointer ml-1"
              onClick={() => navigate("/signup")}
            >
              Sign up 
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
