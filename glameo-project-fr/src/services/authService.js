import axios from "axios";


const API_URL = "http://localhost:8004/glameo/user";

// Centralized API Request Handler
const apiRequest = async (method, endpoint, data = {},token = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url: `${API_URL}/${endpoint}`,
      data,
      headers,
    });

    console.log(`${method.toUpperCase()} Success:`, response.status, response.data);

    return { 
      status: response.data?.status,
      message: response.data?.message, 
      data: response.data
      };

  } catch (error) {
    const status = error.response?.data?.status ?? false; 
    const message = error.response?.data?.message || "Something went wrong";
    const data = error.response?.data;

    console.error(`${method.toUpperCase()} Error:`, error); 
    console.log("⚠️ Error Status:", status);
    console.log("⚠️ Error Message:", message);
    console.log("⚠️ Error Message:", data)
    return {
       status,message,data
        };
  }
};

// Login Function Using apiRequest
export const loginUsers = async (userLoginId, password) => {
  return apiRequest("post", "login", { userLoginId, password });
};

// Logout Function Using apiRequest
export const logoutUser = async (refreshToken) => {
  const accessToken = localStorage.getItem("accessToken");
  return apiRequest("post", "logout", { refreshToken },accessToken);
};

// create customer user Function Using apiRequest
export const createCustomerUser = async (customerData) => {
  const {customerId,name,email,password,mobileNo}=customerData
  return apiRequest("post", "create-user-customer", {customerId,name,email,password,mobileNo});
  };

export const listCustomerUsers = async(listCustomerUsersData) =>{
  const accessToken = localStorage.getItem("accessToken");
  const {page,limit,sortingOrder,search,searchValue}=listCustomerUsersData
  return apiRequest("post", "list-user-customer", {page,limit,sortingOrder,search,searchValue},accessToken);
}

export const deleteCustomerUser = async(deletePayload) =>{
  const accessToken = localStorage.getItem("accessToken");
  const {customerId}=deletePayload
  return apiRequest("delete", "delete-user-customer", {customerId},accessToken);
}

export const fetchCustomerUserDetails= async(fetcheUserDetailsPayload) =>{
  const accessToken = localStorage.getItem("accessToken");
  const {customerId}=deletePayload
  return apiRequest("delete", "delete-user-customer", {customerId},accessToken);
}