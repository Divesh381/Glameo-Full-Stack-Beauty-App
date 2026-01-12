import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("userData");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem("userData"); // Remove invalid data
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const storedUser = localStorage.getItem("userData");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userData"); // Auto-fix invalid data
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (userData) => {
    try {
      console.log(" Saving userData:", userData.data);
      localStorage.setItem("userData", JSON.stringify(userData.data));  //  Fix: Store JSON properly
      localStorage.setItem("accessToken", userData.data.accessToken);
      setUser(userData.data);  //  Updates global state
    } catch (error) {
      console.error("Error saving userData:", error);
    }
  };

  const logout = () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    setUser(null); //  Updates global state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
