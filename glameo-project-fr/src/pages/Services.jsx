// //Services 
// const Services = () => {
//     return (
//       <div className="text-center">
//         <h1 className="text-3xl font-bold">Services</h1>
//         <p className="mt-2 text-gray-600">Learn more Services what we do.</p>
//       </div>
//     );
//   };
  
//   export default Services;  
  

// import React from "react";
// import { Box, Typography, Button, Card, CardContent, Avatar, Grid, useMediaQuery } from "@mui/material";

// const services = [
//   { id: 1, title: "Beauty salon", price: "$75.00", rating: 4.5, image: "beauty_salon.jpg" },
//   { id: 2, title: "Makeup service", price: "$90.00", rating: 4.7, image: "makeup.jpg" },
//   { id: 3, title: "Hair & Styling", price: "$80.00", rating: 5.0, image: "hair_styling.jpg" },
//   { id: 4, title: "Hair color", price: "$85.00", rating: 4.5, image: "hair_color.jpg" },
// ];

// const ServiceCard = ({ service }) => (
//   <Card sx={{ maxWidth: 250, textAlign: "center", p: 2 }}>
//     <Avatar src={service.image} sx={{ width: 80, height: 80, mx: "auto" }} />
//     <CardContent>
//       <Typography variant="h6" fontWeight="bold">{service.title}</Typography>
//       <Typography color="primary" fontWeight="bold">Price: {service.price}</Typography>
//       <Typography variant="body2">⭐ {service.rating}</Typography>
//     </CardContent>
//   </Card>
// );

// const DesktopView = () => (
//   <Box sx={{ p: 3 }}>
//     <Box sx={{ bgcolor: "#1A1A2E", color: "white", p: 3, borderRadius: 2, textAlign: "center" }}>
//       <Typography variant="h5" fontWeight="bold">Selecting Your Passion</Typography>
//       <Typography variant="body1">Discover what ignites your soul for a fulfilling life.</Typography>
//       <Button variant="contained" sx={{ mt: 2, bgcolor: "#6200ea" }}>Discover Now</Button>
//     </Box>
//     <Box sx={{ mt: 3, textAlign: "right" }}>
//       <Typography variant="h6">Balance</Typography>
//       <Typography variant="h4" fontWeight="bold">$560,320.12</Typography>
//       <Button variant="contained" sx={{ mt: 1, bgcolor: "#6200ea" }}>+ Add Balance</Button>
//     </Box>
//     <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>Popular Service</Typography>
//     <Grid container spacing={2} justifyContent="flex-start">
//       {services.map((service) => (
//         <Grid item key={service.id} xs={12} sm={6} md={3}>
//           <ServiceCard service={service} />
//         </Grid>
//       ))}
//     </Grid>
//   </Box>
// );

// const MobileView = () => (
//   <Box sx={{ p: 2, textAlign: "center" }}>
//     <Box sx={{ bgcolor: "#1A1A2E", color: "white", p: 2, borderRadius: 2 }}>
//       <Typography variant="h6" fontWeight="bold">Selecting Your Passion</Typography>
//       <Button variant="contained" sx={{ mt: 2, bgcolor: "#6200ea" }}>Discover</Button>
//     </Box>
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h6">Balance</Typography>
//       <Typography variant="h5" fontWeight="bold">$560,320.12</Typography>
//       <Button variant="contained" sx={{ mt: 1, bgcolor: "#6200ea" }}>+ Add Balance</Button>
//     </Box>
//     <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Popular Service</Typography>
//     <Grid container spacing={2} justifyContent="center">
//       {services.map((service) => (
//         <Grid item key={service.id} xs={12} sm={6}>
//           <ServiceCard service={service} />
//         </Grid>
//       ))}
//     </Grid>
//   </Box>
// );

// export const Services = () => {
//   const isMobile = useMediaQuery("(max-width:600px)");
//   return isMobile ? <MobileView /> : <DesktopView />;
// };


// import React from "react";
// import { Box, Typography, Button, Card, CardContent, Avatar, Grid, useMediaQuery } from "@mui/material";
// import { motion } from "framer-motion";

// const services = [
//   { id: 1, title: "Beauty salon", price: "$75.00", rating: 4.5, image: "beauty_salon.jpg" },
//   { id: 2, title: "Makeup service", price: "$90.00", rating: 4.7, image: "makeup.jpg" },
//   { id: 3, title: "Hair & Styling", price: "$80.00", rating: 5.0, image: "hair_styling.jpg" },
//   { id: 4, title: "Hair color", price: "$85.00", rating: 4.5, image: "hair_color.jpg" },
// ];

// const ServiceCard = ({ service }) => (
//   <motion.div whileHover={{ scale: 1.05 }}>
//     <Card sx={{ maxWidth: 250, textAlign: "center", p: 2 }}>
//       <Avatar src={service.image} sx={{ width: 80, height: 80, mx: "auto" }} />
//       <CardContent>
//         <Typography variant="h6" fontWeight="bold">{service.title}</Typography>
//         <Typography color="primary" fontWeight="bold">Price: {service.price}</Typography>
//         <Typography variant="body2">⭐ {service.rating}</Typography>
//       </CardContent>
//     </Card>
//   </motion.div>
// );

// const Banner = () => (
//   <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//     <Box sx={{ bgcolor: "#1A1A2E", color: "white", p: 4, borderRadius: 3, textAlign: "center", boxShadow: 3 }}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom>
//         Selecting Your Passion
//       </Typography>
//       <Typography variant="body1" sx={{ opacity: 0.9 }}>
//         Discover what ignites your soul for a fulfilling life.
//       </Typography>
//       <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//         <Button variant="contained" sx={{ mt: 3, bgcolor: "#6200ea", px: 4, py: 1.5, fontSize: "1rem", borderRadius: 2 }}>
//           Discover Now
//         </Button>
//       </motion.div>
//     </Box>
//   </motion.div>
// );

// const DesktopView = () => (
//   <Box sx={{ p: 3 }}>
//     <Banner />
//     <Box sx={{ mt: 3, textAlign: "right" }}>
//       <Typography variant="h6">Balance</Typography>
//       <Typography variant="h4" fontWeight="bold">$560,320.12</Typography>
//       <Button variant="contained" sx={{ mt: 1, bgcolor: "#6200ea" }}>+ Add Balance</Button>
//     </Box>
//     <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>Popular Service</Typography>
//     <Grid container spacing={2} justifyContent="flex-start">
//       {services.map((service) => (
//         <Grid item key={service.id} xs={12} sm={6} md={3}>
//           <ServiceCard service={service} />
//         </Grid>
//       ))}
//     </Grid>
//   </Box>
// );

// const MobileView = () => (
//   <Box sx={{ p: 2, textAlign: "center" }}>
//     <Banner />
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h6">Balance</Typography>
//       <Typography variant="h5" fontWeight="bold">$560,320.12</Typography>
//       <Button variant="contained" sx={{ mt: 1, bgcolor: "#6200ea" }}>+ Add Balance</Button>
//     </Box>
//     <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Popular Service</Typography>
//     <Grid container spacing={2} justifyContent="center">
//       {services.map((service) => (
//         <Grid item key={service.id} xs={12} sm={6}>
//           <ServiceCard service={service} />
//         </Grid>
//       ))}
//     </Grid>
//   </Box>
// );

// export const Services = () => {
//   const isMobile = useMediaQuery("(max-width:600px)");
//   return isMobile ? <MobileView /> : <DesktopView />;
// };





import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Card, CardContent, Avatar, Grid, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { id: 1, title: "Beauty salon", price: "$75.00", rating: 4.5, image: "beauty_salon.jpg" },
  { id: 2, title: "Makeup service", price: "$90.00", rating: 4.7, image: "makeup.jpg" },
  { id: 3, title: "Hair & Styling", price: "$80.00", rating: 5.0, image: "hair_styling.jpg" },
  { id: 4, title: "Hair color", price: "$85.00", rating: 4.5, image: "hair_color.jpg" },
];

const bannerContent = [
  { title: "Selecting Your Passion", subtitle: "Discover what ignites your soul for a fulfilling life." },
  { title: "Elevate Your Style", subtitle: "Find the perfect beauty service tailored to you." },
  { title: "Glow with Confidence", subtitle: "Experience top-tier salon services like never before." }
];

const ServiceCard = ({ service }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Card sx={{ maxWidth: 250, textAlign: "center", p: 2 }}>
      <Avatar src={service.image} sx={{ width: 80, height: 80, mx: "auto" }} />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">{service.title}</Typography>
        <Typography color="primary" fontWeight="bold">Price: {service.price}</Typography>
        <Typography variant="body2">⭐ {service.rating}</Typography>
      </CardContent>
    </Card>
  </motion.div>
);

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % bannerContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={index} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.8 }}>
        <Box sx={{ bgcolor: "#1A1A2E", color: "white", p: 4, borderRadius: 3, textAlign: "center", boxShadow: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {bannerContent[index].title}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {bannerContent[index].subtitle}
          </Typography>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="contained" sx={{ mt: 3, bgcolor: "#6200ea", px: 4, py: 1.5, fontSize: "1rem", borderRadius: 2 }}>
              Discover Now
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

const DesktopView = () => (
  <Box sx={{ p: 3 }}>
    <Banner />
    <Box sx={{ mt: 3, textAlign: "right" }}>
      <Typography variant="h6">Balance</Typography>
      <Typography variant="h4" fontWeight="bold">$560,320.12</Typography>
      <Button variant="contained" sx={{ mt: 1, bgcolor: "#6200ea" }}>+ Add Balance</Button>
    </Box>
    <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>Popular Service</Typography>
    <Grid container spacing={2} justifyContent="flex-start">
      {services.map((service) => (
        <Grid item key={service.id} xs={12} sm={6} md={3}>
          <ServiceCard service={service} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

const MobileView = () => (
  <Box sx={{ p: 2, textAlign: "center" }}>
    <Banner />
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Balance</Typography>
      <Typography variant="h5" fontWeight="bold">$560,320.12</Typography>
      <Button variant="contained" sx={{ mt: 1, bgcolor: "#6200ea" }}>+ Add Balance</Button>
    </Box>
    <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Popular Service</Typography>
    <Grid container spacing={2} justifyContent="center">
      {services.map((service) => (
        <Grid item key={service.id} xs={12} sm={6}>
          <ServiceCard service={service} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export const Services = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return isMobile ? <MobileView /> : <DesktopView />;
};