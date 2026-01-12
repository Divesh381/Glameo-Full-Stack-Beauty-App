// src/App.jsx
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import NotificationProvider from "./context/NotificationContext";
const App = () => {
  return (
      <AuthProvider>
        <NotificationProvider>
        <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
  );
};

export default App;