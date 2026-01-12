import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { NotificationContext } from "../context/NotificationContext";
import { AuthContext } from "../context/AuthContext";

const useLogout = () => {
  const navigate = useNavigate();
  const notificationContext = useContext(NotificationContext);
  const notifySuccess = notificationContext?.notifySuccess || (() => {});
  const notifyError = notificationContext?.notifyError || (() => {});
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async (e) => {
    if (e) e.preventDefault(); // Prevent default behavior if used in a button click

    const refreshToken = user?.refreshToken;
    if (!refreshToken) {
      notifyError("Something went wrong");
      localStorage.clear();
      return;
    }

    try {
      const { status, message } = await logoutUser(refreshToken);
      console.log("Logout successful or error:", status, message);
      if (status) {
        notifySuccess(message);
        logout();
        navigate("/login");
      } else {
        notifyError(message);
      }
    } catch (err) {
      notifyError(err.message || "Something went wrong");
    }
  };

  return handleLogout;
};

export default useLogout;
