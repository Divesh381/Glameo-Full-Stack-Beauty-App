// import { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   InputAdornment,
//   MenuItem,Menu
// } from "@mui/material";
// import { Add, Visibility, Edit, Delete ,PersonAdd,MoreVert} from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import {SignupBeautician,SignUpBeauticianUserDetails} from "./SignupBeautician";

// // Sample user data
// const initialUsers = [
  // { email: "Adam@Wee45.com", fullName: "Peter", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Active",addresses:"india-UP", },
  // { email: "Abhay-Staging2@Wee45.com", fullName: "Peter", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Inactive",addresses:"india-UP", },
  // { email: "Ajaylolaniy@gmail.com", fullName: "Tobi", mobileNo:"1243256789",aadhaarNo:"1234568788", onBoarded:true, status: "Active",addresses:"india-UP", },
  // { email: "Chandrashekar-2@Wee45.com", fullName: "Chandra", mobileNo:"1243256789",aadhaarNo:"1234568788", onBoarded:true, status: "Inactive",addresses:"india-UP", },
  // { email: "Adam@Wee45.com", fullName: "Peter", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Active",addresses:"india-UP", },
  // { email: "Abhay-Staging2@Wee45.com", fullName: "Peter", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Inactive",addresses:"india-UP", },
  // { email: "Ajaylolaniy@gmail.com", fullName: "Tobi", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Active",addresses:"india-UP", },
  // { email: "Chandrashekar-2@Wee45.com", fullName: "Chandra", mobileNo:"1243256789",aadhaarNo:"1234568788", onBoarded:true, status: "Inactive",addresses:"india-UP", },
// ];

// const BeauticianUserManagement = () => {
//   const [users, setUsers] = useState(initialUsers);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("latest");
//   const [open, setOpen] = useState(false);
//   const [openOnBoard,setOpenOnBoard]=useState(false)
//   // Filter Users by Search

//   const filteredUsers = users.filter((user) =>
//     user.fullName.toLowerCase().includes(search.toLowerCase()) ||
//     user.email.toLowerCase().includes(search.toLowerCase())
//   );
  



//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box
//     sx={{
//       p: { xs: 2, sm: 3 },
//       backgroundColor: "#f3f4f6", // Light grey background
//       minHeight: "100vh",
//       overflowY: "auto",
//       borderRadius:"8px"
//     }}
//   >
//   {/* Stats Cards */}
//   <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 2 ,textAlign:"center"}}>
//   Beautician Users
// </Typography>
  // <Grid container spacing={2}>
  //   {[
  //     { title: "Total Users", value: 240 },
  //     { title: "Total Active Users", value: 503 },
  //     { title: "Total InActive Users", value: 240 },
  //   ].map((stat, index) => (
  //     <Grid item xs={12} sm={6} md={4} key={index}>
  //       <Card sx={{ textAlign: "center", p: 2 }}>
  //         <CardContent>
  //           <Typography variant="h5">{stat.value}</Typography>
  //           <Typography variant="subtitle1">{stat.title}</Typography>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //   ))}
  // </Grid>

//   {/* Search and Controls */}
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: { xs: "column", sm: "row" },
//       justifyContent: "space-between",
//       alignItems: "center",
//       gap: 2,
//       mt: 3,
//       mb: 0.5,
//     }}
//   >
//     <TextField
//       placeholder="Search By Name"
//       variant="standard"
//       size="small"
//       sx={{ width: { xs: "100%", sm: "300px" } }}
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <SearchIcon />
//           </InputAdornment>
//         ),
//       }}
//     />
//     <Button variant="contained" color="error" startIcon={<Add />} onClick={() => setOpen(true)}>Add Beautician</Button>
//   </Box>

//   {/* User Table */}
//   <TableContainer 
//     component={Paper} 
//     sx={{ 
//       maxHeight: 400, 
//       overflowX: "auto", 
//       borderRadius: "4px", 
//       boxShadow: "0px 4px 10px rgba(243, 240, 240, 0.15)", 
//       border: "0.5px solid #444",
//     }}
//   >
//     <Table stickyHeader sx={{ minWidth: 600 }}>
    // <TableHead>
      // <TableRow sx={{ bgcolor: "#f5f5f5", borderBottom: "2px solid #444", height: 40 }}>
      //   <TableCell sx={{ fontWeight: "bold", textAlign: "left", borderRight: "0.5px solid #bbb",borderBottom: "1px solid #444", padding: "8px" }}>
      //     Email
      //   </TableCell>
      //   <TableCell sx={{ fontWeight: "bold", textAlign: "left", borderRight: "0.5px solid #bbb", borderBottom: "1px solid #444", padding: "8px" }}>
      //     Full Name
      //   </TableCell>
      //   {/* <TableCell sx={{ fontWeight: "bold", textAlign: "left", borderRight: "0.5px solid #bbb", borderBottom: "1px solid #444", padding: "8px" }}>
      //     Last Name
      //   </TableCell> */}
      //   <TableCell sx={{ fontWeight: "bold", textAlign: "left", borderRight: "0.5px solid #bbb", borderBottom: "1px solid #444", padding: "8px" }}>
      //     Phone No
      //   </TableCell>
      //   <TableCell sx={{ fontWeight: "bold", textAlign: "left", borderRight: "0.5px solid #bbb", borderBottom: "1px solid #444", padding: "8px" }}>
      //     Aadhaar no
      //   </TableCell>
      //   <TableCell sx={{ fontWeight: "bold", textAlign: "left", borderRight: "0.5px solid #bbb", borderBottom: "1px solid #444", padding: "8px" }}>
      //    OnBoarded
      //   </TableCell>
      //   <TableCell sx={{ fontWeight: "bold", textAlign: "left", borderRight: "0.5px solid #bbb", borderBottom: "1px solid #444", padding: "8px" }}>
      //     User Status
      //   </TableCell>
      //   <TableCell sx={{ fontWeight: "bold", textAlign: "left", borderRight: "0.5px solid #bbb", borderBottom: "1px solid #444", padding: "8px" }}>
      //    Addresses
      //   </TableCell>
      //   <TableCell sx={{ fontWeight: "bold", textAlign: "left", borderRight: "0.5px solid #bbb", padding: "8px",borderBottom: "1px solid #444" }}>
      //     Actions
      //   </TableCell>
      // </TableRow>
    // </TableHead>
//       <TableBody>
//         {filteredUsers.map((user, index) => (
//           <TableRow 
//             key={index} 
//             sx={{ 
//               "&:nth-of-type(odd)": { bgcolor: "#fafafa" },
//               "&:hover": { bgcolor: "#e3f2fd" },
//               borderBottom: "1px solid #ddd",
//               height: 40,
//             }}
//           >
//             <TableCell sx={{ textAlign: "left", p: 1 }}>{user.email}</TableCell>
//             <TableCell sx={{ textAlign: "left", p: 1 }}>{user.fullName}</TableCell>
//             <TableCell sx={{ textAlign: "left", p: 1 }}>{user.mobileNo}</TableCell>
//             <TableCell sx={{ textAlign: "left", p: 1 }}>{user.aadhaarNo}</TableCell>
//             <TableCell sx={{ textAlign: "left", p: 1 }}>{user.onBoarded ? "Yes" : "No"}</TableCell>
//             <TableCell sx={{ textAlign: "left", p: 1 }}>{user.status}</TableCell>
//             <TableCell sx={{ textAlign: "left", p: 1 }}>{user.addresses}</TableCell>
            // <TableCell sx={{ textAlign: "left", p: 1, whiteSpace: "nowrap" }}>
            //       <IconButton onClick={handleClick}>
            //         <MoreVert />
            //       </IconButton>
            //       <Menu
            //         anchorEl={anchorEl}
            //         open={Boolean(anchorEl)}
            //         onClose={handleClose}
            //         anchorOrigin={{ vertical: "top", horizontal: "left" }}
            //         transformOrigin={{ vertical: "top", horizontal: "right" }}
            //         sx={{
            //           "& .MuiPaper-root": {
            //             backgroundColor: "white", 
            //             boxShadow: "none", 
            //             border: "1px solid #ddd",
            //           },
            //         }}
            //       >
            //         <MenuItem onClick={handleClose}>
            //           <Visibility color="primary" sx={{ marginRight: 1 }} />
            //           View
            //         </MenuItem>
            //         <MenuItem onClick={handleClose}>
            //           <Edit color="warning" sx={{ marginRight: 1 }} />
            //           Edit
            //         </MenuItem>
            //         <MenuItem  onClick={() => { setOpenOnBoard(true);}}>
            //           <PersonAdd color="info" sx={{ marginRight: 1 }} />
            //           OnBoard
            //         </MenuItem>
            //         <MenuItem onClick={handleClose}>
            //           <Delete color="error" sx={{ marginRight: 1 }} />
            //           Delete
            //         </MenuItem>
            //       </Menu>

            //     </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
//    <SignUpBeauticianUserDetails open={openOnBoard} handleClose={() => setOpenOnBoard(false)} />
//    {/* SignupCustomers Modal */}
//   <SignupBeautician open={open} handleClose={() => setOpen(false)} />
// </Box>
//   );
// };

// export default BeauticianUserManagement;



import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Menu,
  useMediaQuery,Checkbox
} from "@mui/material";
import { Add, Visibility, Edit, Delete, PersonAdd, MoreVert } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { SignupBeautician, SignUpBeauticianUserDetails } from "./SignupBeautician";

const initialUsers = [
  { email: "Adam@Wee45.com", fullName: "Peter", mobileNo: "1243256789", aadhaarNo: "1234568788", onBoarded: true, status: "Active", addresses: "India-UP" },
  { email: "Abhay@Wee45.com", fullName: "Tobi", mobileNo: "9876543210", aadhaarNo: "8765432100", onBoarded: false, status: "Inactive", addresses: "India-Delhi" },
  { email: "Adam@Wee45.com", fullName: "Peter", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Active",addresses:"india-UP", },
  { email: "Abhay-Staging2@Wee45.com", fullName: "Peter", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Inactive",addresses:"india-UP", },
  { email: "Ajaylolaniy@gmail.com", fullName: "Tobi", mobileNo:"1243256789",aadhaarNo:"1234568788", onBoarded:true, status: "Active",addresses:"india-UP", },
  { email: "Chandrashekar-2@Wee45.com", fullName: "Chandra", mobileNo:"1243256789",aadhaarNo:"1234568788", onBoarded:true, status: "Inactive",addresses:"india-UP", },
  { email: "Adam@Wee45.com", fullName: "Peter", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Active",addresses:"india-UP", },
  { email: "Abhay-Staging2@Wee45.com", fullName: "Peter", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Inactive",addresses:"india-UP", },
  { email: "Ajaylolaniy@gmail.com", fullName: "Tobi", mobileNo:"1243256789",aadhaarNo:"1234568788",onBoarded:true, status: "Active",addresses:"india-UP", },
  { email: "Chandrashekar-2@Wee45.com", fullName: "Chandra", mobileNo:"1243256789",aadhaarNo:"1234568788", onBoarded:true, status: "Inactive",addresses:"india-UP", },
];

const BeauticianUserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openOnBoard, setOpenOnBoard] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Mobile check

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 2, backgroundColor: "#f3f4f6", minHeight: "100vh", borderRadius: "8px" }}>
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
        Beautician Users
      </Typography>

      {/*  Stats Section (Total Users, Active, Inactive) */}
      <Grid container spacing={2}>
        {[
          { title: "Total Users", value: users.length },
          { title: "Total Active Users", value: users.filter(user => user.status === "Active").length },
          { title: "Total Inactive Users", value: users.filter(user => user.status === "Inactive").length },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5">{stat.value}</Typography>
                <Typography variant="subtitle1">{stat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search and Add Button */}
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 2, alignItems: "center", justifyContent: "space-between", my: 3 }}>
        <TextField
          placeholder="Search By Name"
          variant="standard"
          size="small"
          sx={{ width: isMobile ? "100%" : "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />
        <Button variant="contained" color="error" startIcon={<Add />} onClick={() => setOpen(true)}>Add Beautician</Button>
      </Box>

      {/* Responsive View */}
        {isMobile ? (
        //  Mobile View (Cards)
        <Grid container spacing={2}>
          {filteredUsers.map((user, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ p: 2, display: "flex", flexDirection: "column", position: "relative" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {user.fullName}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    {user.mobileNo}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: user.status === "Active" ? "green" : "red", fontWeight: "bold" }}
                  >
                    {user.status}
                  </Typography>
                </CardContent>
                <IconButton 
                  onClick={(e) => handleMenuClick(e, user)} 
                  sx={{ position: "absolute", top: 10, right: 10 }}
                >
                  <MoreVert />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        //  Desktop View (Table)
      <TableContainer
          component={Paper}
          sx={{
            width: "100%", 
            maxWidth: "1000px", 
            margin: "auto",
            maxHeight: 400,
            overflowX: "auto",
            borderRadius: "5px",
            boxShadow: 3,
            boxShadow: "0px 4px 10px rgba(243, 240, 240, 0.15)", border: "0.5px solid #444"

          }}
        >
  <Table stickyHeader>
    <TableHead>
      <TableRow 
        sx={{ 
          bgcolor: "#f5f5f5", 
          borderBottom: "2px solid #444", 
          height: 40, 
          position: "sticky", 
          top: 0, 
          zIndex: 3 
         
        }}
      >
        <TableCell
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "8px", sm: "12px" },
            p: { xs: 0.5, sm: 1 },
            whiteSpace: "nowrap",
            position: "sticky",
            left: 0,
            bgcolor: "#f5f5f5",
            zIndex: 3,
            minWidth: 150
          }}
        >
          Full Name
        </TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: { xs: "8px", sm: "12px" }, minWidth: 200 }}>Email</TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: { xs: "8px", sm: "12px" }, minWidth: 100 }}>Phone No</TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: { xs: "8px", sm: "12px" }, minWidth: 100 }}>Aadhaar No</TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: { xs: "8px", sm: "12px" }, minWidth: 50 }}>OnBoarded</TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: { xs: "8px", sm: "12px" }, minWidth: 100 }}>User Status</TableCell>
        <TableCell sx={{ fontWeight: "bold", fontSize: { xs: "8px", sm: "12px" }, minWidth: 150 }}>Addresses</TableCell>
        <TableCell
          sx={{
            fontSize: { xs: "8px", sm: "12px" },
            fontWeight: "bold",
            position: "sticky",
            right: 0,
            bgcolor: "#f5f5f5",
            zIndex: 3,
            minWidth: 50
          }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredUsers.map((user, index) => (
        <TableRow key={index} sx={{ "&:nth-of-type(odd)": { bgcolor: "#fafafa" }, "&:hover": { bgcolor: "#e3f2fd" } }}>
          <TableCell
            sx={{
              position: "sticky",
              left: 0,
              bgcolor: "white",
              zIndex: 2
            }}
          >
            {user.fullName}
          </TableCell>
          <TableCell sx={{  fontSize: { xs: "8px", sm: "12px" }, }}>{user.email}</TableCell>
          <TableCell sx={{  fontSize: { xs: "8px", sm: "12px" }, }}>{user.mobileNo}</TableCell>
          <TableCell sx={{  fontSize: { xs: "8px", sm: "12px" }, }}>{user.aadhaarNo}</TableCell>
          <TableCell sx={{  fontSize: { xs: "8px", sm: "12px" }, }}>{user.onBoarded ? "Yes" : "No"}</TableCell>
          <TableCell sx={{  fontSize: { xs: "8px", sm: "12px" }, }}>{user.status}</TableCell>
          <TableCell sx={{  fontSize: { xs: "8px", sm: "12px" }, }}>{user.addresses}</TableCell>
          <TableCell
            sx={{
              position: "sticky",
              right: 0,
              bgcolor: "white",
              zIndex: 2
            }}
          >
            <IconButton onClick={handleClick}><MoreVert /></IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}><Visibility color="primary" /> View</MenuItem>
              <MenuItem onClick={handleClose}><Edit color="warning" /> Edit</MenuItem>
              <MenuItem onClick={() => setOpenOnBoard(true)}><PersonAdd color="info" /> OnBoard</MenuItem>
              <MenuItem onClick={handleClose}><Delete color="error" /> Delete</MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


      )}

      {/* Modals */}
      <SignUpBeauticianUserDetails open={openOnBoard} handleClose={() => setOpenOnBoard(false)} />
      <SignupBeautician open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default BeauticianUserManagement;
