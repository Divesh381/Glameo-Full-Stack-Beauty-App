import { createContext } from "react";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = createContext(null);

const NotificationProvider = ({ children }) => {
  const notifySuccess = (message) => {
    console.log(" notifySuccess Triggered:", message); 
    toast.success(message, { position: "top-right", autoClose: 1000 });
  };

  const notifyError = (message) => {
    console.log("notifyError Triggered:", message); 
    toast.error(message, { position: "top-right", autoClose: 1000 });
  };

  return (
    <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;








// import { createContext } from "react";
// import { SnackbarProvider, useSnackbar } from "notistack";

// export const NotificationContext = createContext(null);

// const NotificationProvider = ({ children }) => {
//   const { enqueueSnackbar } = useSnackbar();

//   const notifySuccess = (message) => {
//     console.log("✅ notifySuccess Triggered:", message);
//     enqueueSnackbar(message, { variant: "success", autoHideDuration: 3000 });
//   };

////   const notifyError = (message) => {
//     console.log("❌ notifyError Triggered:", message);
//     enqueueSnackbar(message, { variant: "error", autoHideDuration: 3000 });
//   };

//   return (
//     <SnackbarProvider maxSnack={3}>
//       <NotificationContext.Provider value={{ notifySuccess, notifyError }}>
//         {children}
//       </NotificationContext.Provider>
//     </SnackbarProvider>
//   );
// };

// export default NotificationProvider;


