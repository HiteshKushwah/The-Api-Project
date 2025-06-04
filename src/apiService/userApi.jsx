
import axiosInstance from "../Helper/axiosInstance";
import apiPath from "./apiPath";

// Get all users (Dashboard)
const getAllUsers = async (params) => {
  try {
    const response = await axiosInstance.get(apiPath.user.GET_ALL_USERS, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch users" };
  }
};

// Get specific user details
const getUserDetails = async ({ userId }) => {
  try {
    const response = await axiosInstance.get(`${apiPath.user.USER_DETIALS}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user details" };
  }
};

// Edit user
const editUser = async (userId, body) => {
  try {
    const response = await axiosInstance.put(`${apiPath.user.EDIT_USER}/${userId}`, body, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update user" };
  }
};

// Delete user
const deleteUser = async ({ userId }) => {
  try {
    const response = await axiosInstance.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete user" };
  }
};

// Create userService object and export it
const userService = {
  getAllUsers,
  getUserDetails,
  editUser,
  deleteUser,
};

export default userService;
