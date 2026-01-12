import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import {Services} from "../pages/Services";
import Login from "../pages/LogIn";
import Dashboard from "../pages/Dashboard";
import { useState, useEffect,useContext } from "react";
import Signup from "../pages/Signup";
import MobileOTPLogin from "../pages/MobileOTPLogin";
import Cart from "../pages/Cart"
import BeauticianDashboard from "../pages/BeauticianPages/BeauticianDashboard";
import { AuthContext } from "../context/AuthContext";
import  UserManagement  from "../pages/AdminPages/UserManagement";
import BeauticianUserManagement from "../pages/AdminPages/BeauticianManagement";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  // fetch userType
  const userType = user?.userType

  // Conditionally render routes based on userType
  const shouldRenderDashboard = user?.userType === "admin" ;
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}> 
      <Routes>
        <Route element={<MainLayout userType={userType} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mobileotplogin" element={<MobileOTPLogin />} />
          <Route path="/cart" element={<Cart userType={userType} />} />
          <Route path="/beauticiandashboard" element={<BeauticianDashboard />} />
          
          {/*  Conditionally render Dashboard if user is NOT "customer" or "freelancer" */}
          {shouldRenderDashboard && (<Route path="/dashboard" element={<Dashboard />} />)}
          {shouldRenderDashboard && (<Route path="/dashboard/usermanagement" element={<UserManagement />} />)}
          {shouldRenderDashboard && (<Route path="/dashboard/beauticianusermanagement" element={<BeauticianUserManagement />} />)}

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;


