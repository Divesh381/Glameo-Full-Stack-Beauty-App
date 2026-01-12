import { useState,useContext,useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton,Box,Avatar,Typography,CircularProgress, Divider  } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import { Close as CloseIcon, Phone as PhoneIcon, Email as EmailIcon, Person as PersonIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { NotificationContext } from "../../context/NotificationContext";
import { createCustomerUser,deleteCustomerUser,fetchCustomerUserDetails } from "../../services/authService";

// export const SignupCustomers = ({ open, handleClose }) => {
//   const initialFormState = {
//     customerId: "",
//     name: "",
//     email: "",
//     password: "",
//     mobileNo: "",
//   };
//   const notificationContext = useContext(NotificationContext);
//   const notifySuccess = notificationContext?.notifySuccess || (() => {});
//   const notifyError = notificationContext?.notifyError || (() => {});
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading]= useState(false)
//   const [formData, setFormData] = useState(initialFormState);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//       e.preventDefault();
//       setLoading(true); 
//       console.log("Signup Data: ", formData);
  
//       // Mapping the formData to match the API's expected payload format
//       const customerData = {
//         customerId: "",
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         mobileNo: formData.mobileNo,
//       };
  
//       try {
//         // Calling the createCustomerUser API function
//         const {status,message}= await createCustomerUser(customerData);
        
//         if (status){
//           notifySuccess(message)
//           setLoading(false);
//         }
//         else{
//           notifyError(message);
//         }
//       } catch (err) {
//         notifyError(err.message || "Something went wrong");
//         setLoading(false);
//       }
//     };

//   return (
//     <Dialog open={open} onClose={() => { setFormData(initialFormState); handleClose(); }} maxWidth="xs" fullWidth>
//       <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",fontSize: "1rem" }}>
//         Add Customer User
//         <IconButton onClick={() => { setFormData(initialFormState); handleClose(); }} size="small">
//           <CloseIcon fontSize="small" />
//           </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
//         <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
//         <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
//         <TextField label="Phone Number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
//       </DialogContent>
//       <DialogActions sx={{ justifyContent: "right", paddingBottom: 2 }}>
//         <Button  onClick={() => { setFormData(initialFormState); handleClose(); }}  variant="contained" color="secondary" sx={{ backgroundColor: "#374151" }}>
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" color="error" sx={{ backgroundColor: "#ff7f7f" }}>
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>

//   );
// };

// export const SignupCustomers = ({ open, handleClose ,userDetails}) => {
//   console.log('===============+++++++++++++++++=================userDetails',userDetails)
//   const initialFormState = {
//     customerId: "",
//     name: "",
//     email: "",
//     password: "",
//     mobileNo: "",
//   };
//   const notificationContext = useContext(NotificationContext);
//   const notifySuccess = notificationContext?.notifySuccess || (() => {});
//   const notifyError = notificationContext?.notifyError || (() => {});
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState(initialFormState);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const isFormValid = () => {
//     return formData.name && formData.email && formData.password && formData.mobileNo;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log("Signup Data: ", formData);

//     const customerData = {
//       customerId: "",
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       mobileNo: formData.mobileNo,
//     };

//     try {
//       const { status, message } = await createCustomerUser(customerData);

//       if (status) {
//         notifySuccess(message);
//         setFormData(initialFormState);
//       } else {
//         notifyError(message);
//       }
//     } catch (err) {
//       notifyError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={() => { setFormData(initialFormState); handleClose(); }} maxWidth="xs" fullWidth>
//       <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1rem" }}>
//         Add Customer User
//         <IconButton onClick={() => { setFormData(initialFormState); handleClose(); }} size="small">
//           <CloseIcon fontSize="small" />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" variant="standard" InputProps={{ sx: { fontSize: "0.875rem" } }} />
//         <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" variant="standard" InputProps={{ sx: { fontSize: "0.875rem" } }} />
//         <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" variant="standard" InputProps={{ sx: { fontSize: "0.875rem" } }} />
//         <TextField label="Phone Number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} fullWidth margin="normal" variant="standard" InputProps={{ sx: { fontSize: "0.875rem" } }} />
//       </DialogContent>
//       <DialogActions sx={{ justifyContent: "right", paddingBottom: 2 }}>
//         <Button onClick={() => { setFormData(initialFormState); handleClose(); }} variant="contained" color="secondary" sx={{ backgroundColor: "#374151" }}>
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" color="error" sx={{ backgroundColor: "#ff7f7f", "&:hover": { backgroundColor: "#e60000" },"&:disabled": { backgroundColor: "#ffb3b3" }, color: "white", }} disabled={!isFormValid() || loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export const SignupCustomers = ({ open, handleClose ,userDetails}) => {
//   console.log('===============+++++++++++++++++=================userDetails',userDetails)
//   const initialFormState = {
//     customerId: userDetails?.customerId || "", 
//     name: userDetails?.name || "",
//     email: userDetails?.email || "",
//     password: "", 
//     mobileNo: userDetails?.mobileNo || "",
//   };
//   const notificationContext = useContext(NotificationContext);
//   const notifySuccess = notificationContext?.notifySuccess || (() => {});
//   const notifyError = notificationContext?.notifyError || (() => {});
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     // Update form data when userDetails changes (useful for opening modal multiple times)
//     setFormData(initialFormState);
//   }, [userDetails, open]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const isFormValid = () => {
//     return formData.name && formData.email && formData.password && formData.mobileNo;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log("Signup Data: ", formData);

//     const customerData = {
//       customerId: userDetails? formData.customerId : "",
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       mobileNo: formData.mobileNo,
//     };

//     try {
//       const { status, message } = await createCustomerUser(customerData);

//       if (status) {
//         notifySuccess(message);
//         setFormData(initialFormState);
//       } else {
//         notifyError(message);
//       }
//     } catch (err) {
//       notifyError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={() => { setFormData(initialFormState); handleClose(); }} maxWidth="xs" fullWidth>
//       <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1rem" }}>
//       {userDetails ? "Edit Customer User" : "Add Customer User"}
//         <IconButton onClick={() => { setFormData(initialFormState); handleClose(); }} size="small">
//           <CloseIcon fontSize="small" />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" variant="standard" InputProps={{ sx: { fontSize: "0.875rem" } }} />
//         <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" variant="standard" InputProps={{ sx: { fontSize: "0.875rem" } }} />
//         <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" variant="standard" InputProps={{ sx: { fontSize: "0.875rem" } }} />
//         <TextField label="Phone Number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} fullWidth margin="normal" variant="standard" InputProps={{ sx: { fontSize: "0.875rem" } }} />
//       </DialogContent>
//       <DialogActions sx={{ justifyContent: "right", paddingBottom: 2 }}>
//         <Button onClick={() => { setFormData(initialFormState); handleClose(); }} variant="contained" color="secondary" sx={{ backgroundColor: "#374151" }}>
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" color="error" sx={{ backgroundColor: "#ff7f7f", "&:hover": { backgroundColor: "#e60000" },"&:disabled": { backgroundColor: "#ffb3b3" }, color: "white", }} disabled={!isFormValid() || loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

export const SignupCustomers = ({ open, handleClose, userDetails }) => {
  console.log("User Details:", userDetails);

  const initialFormState = {
    customerId: userDetails?.customerId || "", // Only set if editing
    name: userDetails?.name || "",
    email: userDetails?.email || "",
    password: "", // Keep empty for editing
    mobileNo: userDetails?.mobileNo || "",
  };

  const notificationContext = useContext(NotificationContext);
  const notifySuccess = notificationContext?.notifySuccess || (() => {});
  const notifyError = notificationContext?.notifyError || (() => {});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  // Update form when userDetails change (useful when opening multiple times)
  useEffect(() => {
    setFormData({
      customerId: userDetails?.customerId || "",
      name: userDetails?.name || "",
      email: userDetails?.email || "",
      password: "", // Always reset password field
      mobileNo: userDetails?.mobileNo || "",
    });
  }, [userDetails, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    // Password is required only for new users
    return formData.name && formData.email && formData.mobileNo && (!userDetails || formData.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const customerData = {
      customerId: userDetails?.customerId || "", 
      name: formData.name,
      email: formData.email,
      password: formData.password,
      mobileNo: formData.mobileNo,
    };
     console.log('handleSubmit,customerData',customerData)
    try {
      const { status, message } = await createCustomerUser(customerData); // API handles both create & update

      if (status) {
        notifySuccess(message);
        handleClose(); // Close modal
      } else {
        notifyError(message);
      }
    } catch (err) {
      notifyError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "1rem" }}>
        {userDetails ? "Edit Customer User" : "Add Customer User"}
        <IconButton onClick={handleClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" variant="standard" />
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" variant="standard" />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="standard"
        />
        <TextField label="Phone Number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} fullWidth margin="normal" variant="standard" />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "right", paddingBottom: 2 }}>
        <Button onClick={handleClose} variant="contained" color="secondary" sx={{ backgroundColor: "#374151" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="error"
          sx={{ backgroundColor: "#ff7f7f", "&:hover": { backgroundColor: "#e60000" }, "&:disabled": { backgroundColor: "#ffb3b3" }, color: "white" }}
          disabled={!isFormValid() || loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};



export const UserProfileDetails = ({ detailsOpen, handleClose, user }) => {
    const [loading, setLoading] = useState(false);
    const notificationContext = useContext(NotificationContext);
    const notifySuccess = notificationContext?.notifySuccess || (() => {});
    const notifyError = notificationContext?.notifyError || (() => {});
    const [fetchUserDetails, setFetchUserDetails] = useState(user || {});
    console.log('==============================user ====',user)
    if (!user) return null

    const handleFetchUserDetails = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const fetcheUserDetailsPayload={
        "customerId": user?.customerId || "",
      }
      
      try {
        const { status, message,data } = await fetchCustomerUserDetails(fetcheUserDetailsPayload); 
  
        if (status) {
          setFetchUserDetails(data?.data || {})
          notifySuccess(message);
          handleClose(); 
        } else {
          notifyError(message);
        }
      } catch (err) {
        notifyError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    return (
      <Dialog open={detailsOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          User Details
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers>
          <Box sx={{ textAlign: "center", p: 2 }}>
            <Avatar
              sx={{ width: 80, height: 80, margin: "auto" }}
              src="https://via.placeholder.com/80"
            />
            <Typography variant="h6" sx={{ mt: 1 }}>
              {fetchUserDetails.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {fetchUserDetails.email}
            </Typography>
          </Box>
  
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Contact Details:
            </Typography>
            <Typography>📞 {fetchUserDetails.phone}</Typography>
            <Typography
              sx={{ color: fetchUserDetails.status === "Active" ? "green" : "red", mt: 1 }}
            >
              🔵 {fetchUserDetails.status}
            </Typography>
          </Box>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#fff", bgcolor: "#1976D2" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };



export const UserDelete = ({ deleteOpen, handleClose, userDetails }) => {
  const [loading, setLoading] = useState(false);
  const notificationContext = useContext(NotificationContext);
  const notifySuccess = notificationContext?.notifySuccess || (() => {});
  const notifyError = notificationContext?.notifyError || (() => {});

  if (!userDetails) return null; // Agar userDetails nahi hai toh Dialog show hi na ho

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    const deletePayload={
      "customerId": userDetails.customerId,
    }
    
    try {
      const { status, message } = await deleteCustomerUser(deletePayload); // Corrected API call

      if (status) {
        notifySuccess(message);
        handleClose(); // Close modal after success
      } else {
        notifyError(message);
      }
    } catch (err) {
      notifyError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={deleteOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography variant="body1" align="center">
          Are you sure you want to delete <strong>{userDetails?.name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={handleClose} variant="contained" color="secondary" sx={{ backgroundColor: "#374151" }}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={loading}
          sx={{
            ml: 2,
            backgroundColor: "#ff4d4d",
            "&:hover": { backgroundColor: "#cc0000" },
            "&:disabled": { backgroundColor: "#ffb3b3" },
          }}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};