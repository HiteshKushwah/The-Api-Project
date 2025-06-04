import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import userService from "../../apiService/userApi";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  email: Yup.string().email("Invalid Email").required("Email is required."),
  password: Yup.string().min(6, "Password must be at least 6 characters."),
});

const EditUser = () => {
  const { id, token } = useParams();
  const goTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus("");
      setSubmitting(true);

      try {
        const body = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        const response = await userService.editUser(id, body);

        console.log("Update Response:", response);
        toast.success("User updated successfully!");
        setTimeout(() => {
          goTo(-1);
        }, 2000);
      } catch (err) {
        console.error("Update error:", err);
        const errorMsg = err.message || "Failed to update user.";
        setStatus(errorMsg);
        toast.error(errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      formik.setSubmitting(true);
      formik.setStatus("");
      console.log(`Fetching details for user ID: ${id} with token: ${token}`);
      try {
        const response = await userService.getUserDetails({ userId: id });

        console.log("API Response:", response);
        const userDetails = response.user || response || {};
        formik.setValues({
          name: userDetails.name || "",
          email: userDetails.email || "",
          password: "",
        });
        if (!userDetails.name || !userDetails.email) {
          console.warn("User details incomplete:", userDetails);
          formik.setStatus("User details incomplete.");
          toast.error("User details incomplete.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        const errorMsg = err.message || "Failed to fetch user details.";
        formik.setStatus(errorMsg);
        toast.error(errorMsg);
      } finally {
        formik.setSubmitting(false);
      }
    };

    fetchUserDetails();
  }, [id, token, goTo]);

  return (
    <div className="box">
      <h2>Edit User</h2>
      {formik.isSubmitting && <p>Loading...</p>}
      {formik.status && <p className="error">{formik.status}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.name && formik.errors.name && (
            <p className="error">{formik.errors.name}</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditUser;