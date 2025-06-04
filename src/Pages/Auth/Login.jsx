import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import authService from "../../apiService/authApi";

const validationSchema = Yup.object({
  emailBox: Yup.string().email("Invalid Email").required("Email is required."),
  pass: Yup.string().required("Password is required."),
});

const Login = () => {
  const goTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      emailBox: "",
      pass: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { emailBox, pass } = values;

      console.log("Attempting login with:", { email: emailBox, password: pass });

      try {
        const body = {
          email: emailBox,
          password: pass,
        };
        const response = await authService.loginUser(body);

        console.log("Login API Response:", response);

        const userName = response.data?.name || "Guest";
        const userToken = response.data?.token;

        console.log("Extracted userName:", userName, "userToken:", userToken);

        if (!userToken) {
          toast.error("Login failed: No token received.");
          console.warn("Login failed: No token received from API response.");
          return;
        }

        localStorage.setItem("userName", userName);
        localStorage.setItem("userToken", userToken);

        toast.success("Logged in!");

        console.log("Login successful. Navigating to /dashboard with state:", { userName, userToken });
        goTo("/dashboard", {});
      } catch (err) {
        const errorMsg = err.message || "Wrong email or password.";
        console.error("Login Error:", err);
        toast.error(errorMsg);
      }
    },
  });

  return (
    <div className="box">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="emailBox"
            value={formik.values.emailBox}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.emailBox && formik.errors.emailBox && (
            <p className="error">{formik.errors.emailBox}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="pass"
            value={formik.values.pass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.pass && formik.errors.pass && (
            <p className="error">{formik.errors.pass}</p>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>
          Not signed up? <Link to="/register">Sign Up</Link>
        </p>
        <p>
          <Link to="/forgot-password" className="text-warning fw-bold">
            Forgot Password?
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
