// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const MobileOTPLogin = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSendOTP = () => {
//     if (!/^\d{10}$/.test(phone)) {
//       setError("Please enter a valid 10-digit phone number.");
//       return;
//     }
//     setError("");
//     setIsOtpSent(true);
////     // Here you would call API to send OTP
//     console.log("OTP sent to:", phone);
//   };

//   const handleVerifyOTP = () => {
//     if (otp.length !== 6) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }
//     setError("");
//     // Here you would verify OTP via API
//     console.log("OTP verified:", otp);
//     navigate("/");
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 to-blue-600">
//       <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96">
//         <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign in with OTP</h2>

//         {/* Phone Number Input */}
//         {!isOtpSent ? (
//           <div className="mb-4">
//             <label className="block text-white mb-1">Phone Number</label>
//             <input
//               type="tel"
//               className="w-full px-3 py-2 bg-white bg-opacity-20 text-white rounded-lg focus:outline-none"
//               placeholder="Enter your phone number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               maxLength="10"
//               required
//             />
//             <button
//               className="mt-3 w-full bg-white text-blue-600 py-2 rounded-lg font-bold hover:bg-opacity-80"
//               onClick={handleSendOTP}
//             >
//               Send OTP
//             </button>
//           </div>
//         ) : (
//             <div className="mb-4">
//             <label className="block text-white mb-2 text-lg font-semibold">Enter OTP</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 text-center text-lg font-semibold tracking-widest bg-white bg-opacity-25 text-white rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               maxLength="6"
//               required
//             />
//             <button
//               className="mt-4 w-full bg-white text-green-600 py-2 rounded-lg font-bold hover:bg-opacity-80 transition duration-300"
//               onClick={handleVerifyOTP}
//             >
//               Verify OTP
//             </button>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && <p className="text-center text-red-500 mt-2">{error}</p>}

//         {/* Back to Login */}
//         <p className="text-center text-white mt-4">
//           <span
//             className="text-blue-200 underline cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             Back to Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MobileOTPLogin;

// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const MobileOTPLogin = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const inputRefs = useRef([]);

//   const handleSendOTP = () => {
//     if (!/^\d{10}$/.test(phone)) {
//       setError("Please enter a valid 10-digit phone number.");
//       return;
//     }
//     setError("");
//     setIsOtpSent(true);
//     console.log("OTP sent to:", phone);
//   };

//   const handleChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return; // Allow only numbers
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleVerifyOTP = () => {
//     const otpValue = otp.join("");
//     if (otpValue.length !== 6) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }
//     setError("");
//     console.log("OTP verified:", otpValue);
//     navigate("/");
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 to-blue-600">
//       <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96">
//         <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign in with OTP</h2>

//         {/* Phone Number Input */}
//         {!isOtpSent ? (
//           <div className="mb-4">
//             <label className="block text-white mb-1">Phone Number</label>
//             <input
//               type="tel"
//               className="w-full px-3 py-2 bg-white bg-opacity-20 text-white rounded-lg focus:outline-none"
//               placeholder="Enter your phone number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               maxLength="10"
//               required
//             />
//             <button
//               className="mt-3 w-full bg-white text-blue-600 py-2 rounded-lg font-bold hover:bg-opacity-80"
//               onClick={handleSendOTP}
//             >
//               Send OTP
//             </button>
//           </div>
//         ) : (
//           <div className="mb-4">
//             <label className="block text-white mb-2 text-lg font-semibold">Enter OTP</label>
//             <div className="flex justify-center space-x-2">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   maxLength="1"
//                   className="w-12 h-12 text-center text-lg font-semibold border border-white bg-white bg-opacity-25 text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
//                   value={digit}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                 />
//               ))}
//             </div>
//             <button
//               className="mt-4 w-full bg-white text-green-600 py-2 rounded-lg font-bold hover:bg-opacity-80 transition duration-300"
//               onClick={handleVerifyOTP}
//             >
//               Verify OTP
//             </button>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && <p className="text-center text-red-500 mt-2">{error}</p>}

//         {/* Back to Login */}
//         <p className="text-center text-white mt-4">
//           <span
//             className="text-blue-200 underline cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             Back to Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MobileOTPLogin;



import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MobileOTPLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // OTP state as an array
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleSendOTP = () => {
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    setIsOtpSent(true);
    console.log("OTP sent to:", phone);
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a number is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join(""); // Combine the OTP digits
    if (enteredOTP.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setError("");
    console.log("OTP verified:", enteredOTP);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-500 to-blue-600">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign in with OTP</h2>

        {/* Phone Number Input */}
        {!isOtpSent ? (
          <div className="mb-4">
            <label className="block text-white mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full px-3 py-2 bg-white bg-opacity-20 text-white rounded-lg focus:outline-none"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength="10"
              required
            />
            <button
              className="mt-3 w-full bg-white text-blue-600 py-2 rounded-lg font-bold hover:bg-opacity-80"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-white mb-2 text-lg font-semibold">Enter OTP</label>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center text-lg font-bold border border-white bg-white bg-opacity-25 text-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
            <button
              className="mt-4 w-full bg-white text-green-600 py-2 rounded-lg font-bold hover:bg-opacity-80 transition duration-300"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-center text-red-500 mt-2">{error}</p>}

        {/* Back to Login */}
        <p className="text-center text-white mt-4">
          <span
            className="text-blue-200 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default MobileOTPLogin;
