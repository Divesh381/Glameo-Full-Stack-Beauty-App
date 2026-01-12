import { useState,useEffect } from "react";
import {
  Box, Card, CardContent, Typography, Grid, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Menu, Paper, Button, IconButton, InputAdornment,
  MenuItem, Dialog, useMediaQuery
} from "@mui/material";
import { Add, Visibility, Edit, Delete, MoreVert } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import {SignupCustomers,UserProfileDetails,UserDelete} from "./SignupCustomer";
import { listCustomerUsers } from "../../services/authService";

const initialUsers = [
  { email: "Adam@Wee45.com", fullName: "Peter", mobileNo: "1243256789", status: "Active" },
  { email: "Abhay@Wee45.com", fullName: "Tobi", mobileNo: "1243256789", status: "Inactive" },
  { email: "Chandra@Wee45.com", fullName: "Chandra", mobileNo: "1243256789", status: "Active" },
  { email: "Ajay@gmail.com", fullName: "Ajay", mobileNo: "1243256789", status: "Inactive" },
  { email: "Chandra@Wee45.com", fullName: "Chandra", mobileNo: "1243256789", status: "Active" },
  { email: "Ajay@gmail.com", fullName: "Ajay", mobileNo: "1243256789", status: "Inactive" },
];

const UserManagement = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [users,setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [detailsOpen,setDetailsOpen]= useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalUser,setTotalUser] = useState(0)
  const [deleteOpen, setDeleteOpen] = useState(false)

   // Fetch Users from API
   const fetchCustomerUsers = async () => {
    setLoading(true);
    const formFetchCustomerData={
      page: 1,
      limit: 10,
      sortingOrder: "dsc",
      search: true,  
      searchValue: search
    }
    try {
      const {status,message,data} = await listCustomerUsers(formFetchCustomerData);
      console.log('========status====',status,'============= listCustomerUsers data ===========================',data?.totalUsers)
      if(status){
        setUsers(data?.data); 
        setTotalUser(data?.totalUsers)
        setLoading(false);
      }
      else{
        setUsers([]);
        console.log('Error fetching users:', message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
   
  };


  // Fetch users on component mount and search change
  useEffect(() => {
    fetchCustomerUsers();
  }, [search]);  




  const handleClose = () => setAnchorEl(null);

  const handleClick = (event, user) => {
    setAnchorEl(event.currentTarget); 
    setSelectedUser(user);  
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  const handleViewDetails = () => {
    setDetailsOpen(true);  
    handleCloseMenu();
  };
  const hadleEditDetails = ()=>
  {
    setEditOpen(true)
    handleCloseMenu();
  }
  const handleDeleteUser = ()=>
  {
    setDeleteOpen(true)
    handleCloseMenu();
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "#f3f4f6", minHeight: "100vh", borderRadius: "8px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 2, textAlign: "center" }}>
        Customer Users
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={2}>
        {[
          { title: "Total Users", value: totalUser },
          { title: "Total Active Users", value: 1 },
          { title: "Total Inactive Users", value: 12 },
        ].map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h5">{stat.value}</Typography>
                <Typography variant="subtitle1">{stat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search & Add Button */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", mt: 3, mb: 2 }}>
        <TextField
          placeholder="Search By Name"
          variant="standard"
          size="small"
          sx={{ width: { xs: "100%", sm: "300px" } }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="error" startIcon={<Add />} onClick={() => setOpen(true)} sx={{ mt: { xs: 2, sm: 0 } }}>
          Create
        </Button>
      </Box>

      {/* Conditional Rendering for Desktop & Mobile Views */}
      {isMobile ? (
        // Mobile View - List Cards
        <Grid container spacing={2}>
          {users.map((user, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{user.name}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                  <Typography variant="body2">{user.mobileNo}</Typography>
                  <Typography variant="body2" color={user.status === "Active" ? "green" : "red"}>{user.status}</Typography>
                </Box>
                <IconButton onClick={(e) => handleClick(e, user)}> 
                  <MoreVert />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        //  Desktop View - Table
       
            <TableContainer
            component={Paper}
            sx={{
              borderRadius: "4px",
              boxShadow: "0px 4px 10px rgba(243, 240, 240, 0.15)",
              border: "0.5px solid #444",
              overflowX: "auto", // Horizontal Scroll
              overflowY: "auto", // Vertical Scroll
              maxWidth: "100vw",
              height: "300px", // Fixed height
              display: "block",
            }}>
      <Table sx={{ minWidth: 900, tableLayout: "fixed", width: "100%" }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5", borderBottom: "2px solid #444", position: "sticky", top: 0, zIndex: 3 }}>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "left",
                position: "sticky",
                left: 0,
                background: "#f5f5f5",
                zIndex: 3,
                minWidth: "150px",
              }}
            >
              Full Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "left", minWidth: "250px",borderLeft: "1px solid gray"  }}>
              Email
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "left", minWidth: "150px" }}>
              Phone No
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "left", minWidth: "150px" }}>
              User Status
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "left",
                position: "sticky",
                right: 0,
                background: "#f5f5f5",
                zIndex: 3,
                minWidth: "100px",
                borderLeft: "1px solid gray"
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index} sx={{ "&:hover": { bgcolor: "#e3f2fd" } }}>
              <TableCell
                sx={{
                  position: "sticky",
                  left: 0,
                  background: "white",
                  zIndex: 2,
                  minWidth: "150px",
                }}
              >
                {user.name}
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minWidth: "250px",
                }}
              >
                {user.email}
              </TableCell>
              <TableCell sx={{ minWidth: "150px" }}>{user.mobileNo}</TableCell>
              <TableCell
                sx={{
                  minWidth: "150px",
                  color: user.status === "Active" ? "green" : "red",
                }}
              >
                {user.status}
              </TableCell>
              <TableCell
                sx={{
                  position: "sticky",
                  right: 0,
                  background: "white",
                  zIndex: 2,
                  minWidth: "100px",
                }}
              >
                <IconButton onClick={(e) => handleClick(e, user)}>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.length === 0 && (
      <Typography variant="body1" align="center" sx={{ mt: 10 }}>
        No data available
      </Typography>
    )}
    </TableContainer>
    

      )}

      {/* Menu for Actions */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem onClick={handleViewDetails}>
          <Visibility color="primary" sx={{ marginRight: 1 }} /> View
        </MenuItem>
        <MenuItem onClick={hadleEditDetails}>
          <Edit color="warning" sx={{ marginRight: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteUser}>
          <Delete color="error" sx={{ marginRight: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* SignupCustomers Modal */}
     
      <UserProfileDetails detailsOpen={detailsOpen} handleClose={() => setDetailsOpen(false)} user={selectedUser} />
      <SignupCustomers  open={open || editOpen} handleClose={() => { setOpen(false); setEditOpen(false); }} userDetails={editOpen ? selectedUser : null} />
      <UserDelete deleteOpen={deleteOpen} handleClose={() => setDeleteOpen(false)} userDetails={selectedUser} />
    </Box>
  );
};

export default UserManagement;
