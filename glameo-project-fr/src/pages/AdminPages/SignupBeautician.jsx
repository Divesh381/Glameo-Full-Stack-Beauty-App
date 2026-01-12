import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton ,Grid} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const SignupBeautician = ({ open, handleClose }) => {
  const initialFormState = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = formData.fullName ? "" : "Full Name is required";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "" : "Invalid email";
    tempErrors.password = formData.password.length >= 6 ? "" : "Password must be at least 6 characters";
    tempErrors.phone = /^\d{10}$/.test(formData.phone) ? "" : "Phone number must be 10 digits";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", formData);
      setFormData(initialFormState);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={() => { setFormData(initialFormState); handleClose(); }} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",fontSize: "1rem" }}>
        Add Beautician User
        <IconButton onClick={() => { setFormData(initialFormState); handleClose(); }} size="small">
          <CloseIcon fontSize="small" />
          </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
        <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "right", paddingBottom: 2 }}>
        <Button  onClick={() => { setFormData(initialFormState); handleClose(); }}  variant="contained" color="secondary" sx={{ backgroundColor: "#374151" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="error" sx={{ backgroundColor: "#ff7f7f" }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>

  );
};





export const SignUpBeauticianUserDetails = ({ open, handleClose }) => {
  const initialFormState = {
    address: "",
    houseNo: "",
    RoadName: "",
    pinCode: "",
    city: "",
    State: "",
    others: "",
    aadhaarNo: "",
    panCardNo: "",
    aadhaarImage: "",
    panCardImage: "",
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.address = formData.address ? "" : "Address is required";
    tempErrors.houseNo = formData.houseNo ? "" : "House Number is required";
    tempErrors.RoadName = formData.RoadName ? "" : "Road Name is required";
    tempErrors.pinCode = /^\d{6}$/.test(formData.pinCode) ? "" : "Pin Code must be 6 digits";
    tempErrors.city = formData.city ? "" : "City is required";
    tempErrors.State = formData.State ? "" : "State is required";
    tempErrors.aadhaarNo = /^\d{12}$/.test(formData.aadhaarNo) ? "" : "Aadhaar Number must be 12 digits";
    tempErrors.panCardNo = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCardNo) ? "" : "Invalid PAN Number";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", formData);
      setFormData(initialFormState);
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setFormData(initialFormState);
        handleClose();
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "1rem",
        }}
      >
        onBoard Beautician User
        <IconButton
          onClick={() => {
            setFormData(initialFormState);
            handleClose();
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="House no./Building name"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
              fullWidth
              variant="standard"
              error={!!errors.houseNo}
              helperText={errors.houseNo}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Road name/Area/Colony"
              name="RoadName"
              value={formData.RoadName}
              onChange={handleChange}
              fullWidth
              variant="standard"
              error={!!errors.RoadName}
              helperText={errors.RoadName}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              variant="standard"
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="State"
              name="State"
              value={formData.State}
              onChange={handleChange}
              fullWidth
              variant="standard"
              error={!!errors.State}
              helperText={errors.State}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Pincode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              fullWidth
              variant="standard"
              error={!!errors.pinCode}
              helperText={errors.pinCode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Others"
              name="others"
              value={formData.others}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Aadhaar No."
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              fullWidth
              variant="standard"
              error={!!errors.aadhaarNo}
              helperText={errors.aadhaarNo}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="PAN Card No."
              name="panCardNo"
              value={formData.panCardNo}
              onChange={handleChange}
              fullWidth
              variant="standard"
              error={!!errors.panCardNo}
              helperText={errors.panCardNo}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Aadhaar Image URL"
              name="aadhaarImage"
              value={formData.aadhaarImage}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="PAN Card Image URL"
              name="panCardImage"
              value={formData.panCardImage}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "right", paddingBottom: 2 }}>
        <Button
          onClick={() => {
            setFormData(initialFormState);
            handleClose();
          }}
          variant="contained"
          color="secondary"
          sx={{ backgroundColor: "#374151" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="error"
          sx={{ backgroundColor: "#ff7f7f" }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
