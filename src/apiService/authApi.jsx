
import axiosInstance from "../Helper/axiosInstance";
import apiPath from "./apiPath";

// Register function
const registerUser = async (body) => {
  try {
    const response = await axiosInstance.post(apiPath.auth.REGISTER, body);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Login function
const loginUser = async (body) => {
  try {
    const response = await axiosInstance.post(apiPath.auth.LOGIN, body);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Email Verification function
const verifyEmail = async (params) => {
  try {
    const response = await axiosInstance.get(apiPath.auth.VERIFICATION, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Email verification failed" };
  }
};

// Forgot Password function
const forgotPassword = async (body) => {
  try {
    const response = await axiosInstance.post(apiPath.auth.FORGOT_PASSWORD, body);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message :"Forgot password failed" };
  }
};

// Reset Password function
const resetPassword = async (body) => {
  try {
    const response = await axiosInstance.post(apiPath.auth.RESET_PASSWORD, body);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Password reset failed" };
  }
};

// Create authService object and export it
const authService = {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

export default authService;
