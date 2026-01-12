import { useEffect, useState ,useContext} from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";


const MainLayout = () => {
  //Get user from AuthContext
  const { user } = useContext(AuthContext);

  // fetch userType
  const userType = user?.userType
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userType={userType}/>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

