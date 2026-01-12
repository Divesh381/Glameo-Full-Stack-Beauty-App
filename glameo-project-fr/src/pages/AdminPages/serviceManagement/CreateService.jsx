import { useState } from "react";
import { Dialog, DialogTitle, DialogContent,Typography,InputLabel,Select,FormHelperText, Avatar,DialogActions,FormControl, TextField, Button, IconButton,MenuItem,Grid,Box ,Divider} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const CreateService = ({ open, handleClose }) => {
  const initialFormState = {
    name: "",
    type: "",
    category: "",
    description: "",
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "name is required";
    tempErrors.type = formData.type ? "" : "typeis required";
    tempErrors.category =formData.category ? "" : "typeis required";
    tempErrors.description = formData.description ? "" : "typeis required";
    
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
        Add New Service
        <IconButton onClick={() => { setFormData(initialFormState); handleClose(); }} size="small">
          <CloseIcon fontSize="small" />
          </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField label="Service name" name="name"  value={formData.name} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
        <TextField label="Service Type" name="type"  value={formData.type} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
        <TextField label="Service Category" name="category"  value={formData.category} onChange={handleChange} fullWidth margin="normal" variant="standard"  InputProps={{ sx: { fontSize: "0.875rem" } }}/>
        <TextField label="Service description" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" variant="outlined" multiline rows={4} 
                  sx={{
                    width: "100%", 
                    "& .MuiInputBase-root": { minHeight: "100px" }, 
                  }}
                  InputProps={{
                    sx: { fontSize: "0.875rem" }
                  }}
                />
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


// Appointment Form 
export const AppointmentForm = ({ appointmentOpen, handleClose }) => {  
  const initialAppointmentFormState={
    fullName: '',
    phoneNumber: '',
    email: '',
    preferredDate: '',
    serviceRequired: '',
    preferredBeautician: '',
    allergies: '',
    specialRequests: '',
    howDidYouHear: ''
  }
  const [formData, setFormData] = useState(initialAppointmentFormState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Appointment Form submitted", formData);
      setFormData(initialAppointmentFormState);
      handleClose();
    }
  };

  return ( 
    <Dialog open={appointmentOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",fontSize: "1.5rem" }}>
         Appointment Form
        <IconButton onClick={() => { setFormData(initialAppointmentFormState); handleClose(); }} size="small">
          <CloseIcon fontSize="small" />
          </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Full Name" 
              fullWidth 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              variant="standard" 
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
              label="Phone Number" 
              fullWidth 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
              required 
              variant="standard"
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Email Address" 
              fullWidth 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Preferred Date"
              type="date"
              fullWidth
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required variant="standard">
              <InputLabel>Service Required</InputLabel>
              <Select 
                name="serviceRequired" 
                value={formData.serviceRequired} 
                onChange={handleChange} 
              >
                <MenuItem value="facial">Facial</MenuItem>
                <MenuItem value="manicure">Manicure</MenuItem>
                <MenuItem value="pedicure">Pedicure</MenuItem>
                <MenuItem value="waxing">Waxing</MenuItem>
                <MenuItem value="haircut">Haircut</MenuItem>
              </Select>
              <FormHelperText>Choose the service you need</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Preferred Beautician" 
              fullWidth 
              name="preferredBeautician" 
              value={formData.preferredBeautician} 
              onChange={handleChange} 
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField 
              label="Any Allergies or Skin Conditions?" 
              fullWidth 
              name="allergies" 
              value={formData.allergies} 
              onChange={handleChange} 
              multiline 
              rows={2} 
              variant="standard"
            />
          </Grid>

          {/* Special Requests */}
          <Grid item xs={12}>
            <TextField 
              label="Special Requests" 
              fullWidth 
              name="specialRequests" 
              value={formData.specialRequests} 
              onChange={handleChange} 
              multiline 
              rows={2} 
              variant="standard"
            />
          </Grid>

          {/* How did you hear about us? */}
          <Grid item xs={12}>
            <TextField label="How did you hear about us?"  name="howDidYouHear"  value={formData.howDidYouHear} onChange={handleChange} fullWidth margin="normal" variant="outlined" multiline rows={4} 
                  sx={{
                    width: "100%", 
                    "& .MuiInputBase-root": { minHeight: "80px" }, 
                  }}
                  InputProps={{
                    sx: { fontSize: "0.875rem" }
                  }}
                />
          </Grid>
        </Grid>
      </DialogContent>

      {/* Buttons */}
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={() => { setFormData(initialAppointmentFormState); handleClose(); }} sx={{ bgcolor: "#2C2F38", color: "white", "&:hover": { bgcolor: "#1E2128" } }}>
          CANCEL
        </Button>
        <Button onClick={handleSubmit} sx={{ bgcolor: "#FF8A80", color: "white", "&:hover": { bgcolor: "#E57373" } }}>
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export const ServiceDetails = ({ serviceDetailsOpen, handleClose, service }) => {
  console.log('==================================service details====================',service)
  if (!service) return null

  return (
    <Dialog open={serviceDetailsOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6">{service.title}</Typography>
        <IconButton onClick={handleClose}>
        <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar src={service.image} sx={{ width: 80, height: 80 }} />
          <Typography variant="body1" sx={{ textAlign: "center", color: "gray" }}>
            {service.description}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            {service.price}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
