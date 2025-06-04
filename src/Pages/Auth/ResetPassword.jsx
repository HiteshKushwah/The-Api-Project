
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import authService from "../../apiService/authApi";

const validationSchema = Yup.object({
  password: Yup.string()
    .matches(/[0-9]/, "Password must contain at least 1 number.")
    .max(6, "Password should be max 6 characters.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required."),
});

const ResetPassword = () => {
  const { id, token } = useParams();
  const goTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { password } = values;

      console.log("Attempting to reset password for user ID:", id);

      try {
        const body = {
          userId: id,
          token,
          password,
        };
        const response = await authService.resetPassword(body);

        console.log("Reset Password Response:", response);
        toast.success("Password reset successfully!");

        setTimeout(() => {
          goTo("/login");
        }, 2000);
      } catch (error) {
        console.error("Reset Password Error:", error);
        toast.error(error.message || "Password reset failed.");
      }
    },
  });

  return (
    <div className="box">
      <h2>Reset Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="error">{formik.errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
