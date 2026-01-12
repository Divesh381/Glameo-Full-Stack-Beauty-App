import React, { useState } from "react";
import {
  Box, Typography, Button, Card, CardContent, CardMedia, List,
  ListItem, ListItemText, ListItemAvatar, Avatar, Stack,
  IconButton, TextField, InputAdornment, useMediaQuery,Menu,MenuItem,
} from "@mui/material";
import { Add, Close,MoreVert,Visibility,Edit,Delete,Info } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {CreateService,AppointmentForm,ServiceDetails} from "../serviceManagement/CreateService"

const services = [
  { id: 1, title: "Fitness", description: "Soothing oil for perfect massage.", price: "$99.00/mo", image: "https://dummyimage.com/50" },
  { id: 2, title: "Full body massage", description: "Full-body massage: relaxation from head to toe.", price: "$40.00/mo", image: "https://dummyimage.com/50" },
  { id: 3, title: "Medical & Dental Care", description: "Revitalizing shampoo for healthy, shiny hair.", price: "$18.00/mo", image: "https://dummyimage.com/50" },
  { id: 4, title: "Tattoo & Pricing", description: "Balanced plan, essential coverage included.", price: "$20.00/mo", image: "https://dummyimage.com/50" },
];

const timeSlots = ["10:00 AM", "10:30 AM", "12:00 PM", "12:30 AM"];

const DesktopView = ({open,setOpen,appointmentOpen,setOpenAppointment,anchorEl,setAnchorEl,handleServiceDetails,serviceDetailsOpen,setServiceDetailsOpen,selectedServiceData,setSelectedServiceData,selectedService, setSelectedService, selectedTime, setSelectedTime, search, setSearch }) => (
  <Box sx={{ display: "grid", gridTemplateColumns: selectedService ? "1fr 1fr" : "1fr", gap: 2 }}>
    {/* Service List */}
    <Box sx={{ bgcolor: "white", p: 2, borderRadius: 2, overflowY: "auto" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>List of services ({services.length})</Typography>

      <TextField
        placeholder="Search By Name"
        variant="standard"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ minWidth: "150px" }}
        InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
      />

      <Button variant="contained" color="error" startIcon={<Add />} onClick={() => setOpen(true)}>Add Service</Button>
    </Box>
      <List>
        {services.map((service) => (
          <ListItem key={service.id} onClick={() => setSelectedService(service)} sx={{ cursor: "pointer", p: 2 }}>
            <ListItemAvatar><Avatar src={service.image} /></ListItemAvatar>
            <ListItemText primary={service.title} secondary={service.description} />
            <Typography fontWeight="bold">{service.price}</Typography>
            <IconButton sx={{ ml: 0, color: "primary.main" }}  onClick={(e) => {e.stopPropagation(); handleServiceDetails(); setSelectedService(null);setSelectedServiceData(service)}}>
              <Info />
            </IconButton>
            <IconButton sx={{ ml: 0, color: "success.main" }} onClick={(e) => {e.stopPropagation(); setOpen(true);}} >
              <Edit />
            </IconButton>
            <IconButton sx={{ ml: 0, color: "error.main" }} onClick={(e) => {e.stopPropagation()}}>
              <Delete />
            </IconButton>

          </ListItem>
        ))}
      </List>
    </Box>
    
    {/* Service Details */}
    {selectedService && (
      <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, position: "relative" }}>
        <IconButton onClick={() => setSelectedService(null)} sx={{ position: "absolute", top: 10, right: 10 }}>
          <Close fontSize="small" />
        </IconButton>
        <Card>
          <CardMedia component="img" height="200" image="https://dummyimage.com/300x200" alt="Service Image" />
          <CardContent>
            <Typography variant="h6">{selectedService.title}</Typography>
            <Typography variant="body2" color="text.secondary">{selectedService.description}</Typography>
          </CardContent>
        </Card>
        <Stack direction="row" spacing={2} mt={2} sx={{ overflowX: "auto" }}>
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  sx={{
                    bgcolor: selectedTime === time ? "#8661FF" : "#eee",
                    color: selectedTime === time ? "white" : "black",
                    borderRadius: 10,
                  }}
                >
                  {time}
                </Button>
              ))}
            </Stack>
        <Button variant="contained" sx={{ mt: 3, bgcolor: "#8661FF", borderRadius: 10, width: "90%", p: 1.5 }} onClick={() => setOpenAppointment(true)}>
               Make an appointment
          </Button>
      </Box>
    )} 
  
  <ServiceDetails serviceDetailsOpen={serviceDetailsOpen} handleClose={() => setServiceDetailsOpen(false)} service={selectedServiceData}  />
  <AppointmentForm appointmentOpen={appointmentOpen} handleClose={() => setOpenAppointment(false)} />
  <CreateService open={open} handleClose={() => setOpen(false)} />
  </Box>
);

const MobileView = ({open,setOpen,appointmentOpen,setOpenAppointment,selectedService, setSelectedService, selectedTime, setSelectedTime, search, setSearch }) => (
  <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", overflowX: "hidden", p: 2 }}> 
    {!selectedService && (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 2 }}>
        <TextField
          placeholder="Search By Name"
          variant="standard"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%" }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
        />
        <Typography variant="h6">List of services ({services.length})</Typography>
        <Button variant="contained" color="error" startIcon={<Add />} onClick={() => setOpen(true)}>Add Service</Button>
      </Box>
    )}
    {selectedService ? (
      <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, position: "relative", width: "100%", maxWidth: 400, margin: "auto" }}>
        <IconButton onClick={() => setSelectedService(null)} sx={{ position: "absolute", top: 10, right: 10 }}>
          <Close fontSize="small" />
        </IconButton>
        <Card>
          <CardMedia component="img" height="200" image="https://dummyimage.com/300x200" alt="Service Image" />
          <CardContent>
            <Typography variant="h6">{selectedService.title}</Typography>
            <Typography variant="body2" color="text.secondary">{selectedService.description}</Typography>
          </CardContent>
        </Card>

        {/* Fix for overlapping time slots */}
        <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center", py: 2 }}>
          {timeSlots.map((time) => (
            <Button
              key={time}
              onClick={() => setSelectedTime(time)}
              sx={{
                bgcolor: selectedTime === time ? "#8661FF" : "#eee",
                color: selectedTime === time ? "white" : "black",
                borderRadius: 10,
                minWidth: "85px",
                flex: "1 1 30%",
              }}
            >
              {time}
            </Button>
          ))}
        </Box>

        <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#8661FF", borderRadius: 10, p: 1.5 }} onClick={() => setOpenAppointment(true)}>
          Make an appointment
        </Button>
      </Box>
    ) : (
      <List sx={{ width: "100%", maxWidth: 400, margin: "auto", p: 1 }}>
      {services.map((service) => (
        <ListItem 
          key={service.id} 
          onClick={() => setSelectedService(service)} 
          sx={{ 
            cursor: "pointer", 
            p: 2, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            bgcolor: "#f8f8f8", 
            borderRadius: 2, 
            mb: 2, 
            boxShadow: 1,
          }}
        >
      <ListItemAvatar>
        <Avatar src={service.image} sx={{ width: 56, height: 56 }} />
      </ListItemAvatar>
      <ListItemText 
        primary={
          <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
            {service.title}
          </Typography>
        } 
        secondary={
          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
            {service.description}
          </Typography>
        } 
      />
      <Typography fontWeight="bold" sx={{ mt: 1 }}>{service.price}</Typography>
      <IconButton sx={{ ml: 0, color: "primary.main" }}>
              <Info />
            </IconButton>
            <IconButton sx={{ ml: 0, color: "success.main" }} onClick={(e) => {e.stopPropagation(); setOpen(true);}} >
              <Edit />
            </IconButton>
            <IconButton sx={{ ml: 0, color: "error.main" }}>
              <Delete />
            </IconButton>

       </ListItem>
      ))}
    </List>
    )}
  <AppointmentForm appointmentOpen={appointmentOpen} handleClose={() => setOpenAppointment(false)} />
  <CreateService open={open} handleClose={() => setOpen(false)} />
  </Box>
);



const ServiceManagement = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime, setSelectedTime] = useState(timeSlots[2]);
  const [search, setSearch] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [appointmentOpen, setOpenAppointment] = useState(false);
  const [serviceDetailsOpen,setServiceDetailsOpen] = useState(false)
  const [selectedServiceData, setSelectedServiceData] = useState(null);
  
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event, service) => {
    setAnchorEl(event.currentTarget); 
    setSelectedServiceData(service);  
  };
  

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleServiceDetails = ()=>
    {
      setServiceDetailsOpen(true)
      handleCloseMenu();
    }
  return (
    <Box sx={{ p: 2, bgcolor: "#f8f9fa", height: "100vh" }}>
  
{isMobile ? (
  <MobileView 
    open = {open}
    setOpen = {setOpen}
    appointmentOpen = {appointmentOpen}
    setOpenAppointment = {setOpenAppointment}
    selectedService={selectedService} 
    setSelectedService={setSelectedService} 
    selectedTime={selectedTime} 
    setSelectedTime={setSelectedTime} 
    search={search} 
    setSearch={setSearch} 
  />
) : (
  <DesktopView 
    open = {open}
    setOpen = {setOpen}
    appointmentOpen = {appointmentOpen}
    setOpenAppointment = {setOpenAppointment}
    anchorEl={anchorEl}
    setAnchorEl={setAnchorEl}
    handleServiceDetails={handleServiceDetails}
    serviceDetailsOpen={serviceDetailsOpen}
    setServiceDetailsOpen={setServiceDetailsOpen}
    selectedServiceData={selectedServiceData}
    setSelectedServiceData={setSelectedServiceData}
    selectedService={selectedService} 
    setSelectedService={setSelectedService} 
    selectedTime={selectedTime} 
    setSelectedTime={setSelectedTime} 
    search={search} 
    setSearch={setSearch} 
  />
)}
    </Box>
  );
};

export default ServiceManagement;
