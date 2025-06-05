// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import authService from "../../apiService/authApi";

// const validationSchema = Yup.object({
//   fullName: Yup.string().required("Name is required."),
//   emailBox: Yup.string().email("Invalid Email").required("Email is required."),
//   pass: Yup.string()
//     .matches(/[0-9]/, "Password must contain at least 1 number.")
//     .max(6, "Password should be max 6 characters.")
//     .required("Password is required."),
// });

// const Register = () => {
//   const goTo = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       fullName: "",
//       emailBox: "",
//       pass: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       const { fullName, emailBox, pass } = values;

//       console.log("Attempting to register with:", { fullName, emailBox, pass });

//       try {
//         const body = {
//           name: fullName,
//           email: emailBox,
//           password: pass,
//         };
//         const response = await authService.registerUser(body);

//         console.log("Registration API Response:", response);
//         toast.success("You are registered BROTHER!");

//         const userId = response.data.id;
//         const userToken = response.data.emailVerificationTOken;

//         localStorage.setItem("userId", userId);
//         localStorage.setItem("userToken", userToken);

//         console.log("Stored in localStorage - userId:", userId, "userToken:", userToken);

//         setTimeout(() => {
//           const redirectUrl = `/email-verification/${emailBox}`;
//           console.log("Redirecting to:", redirectUrl);
//           goTo(redirectUrl);
//         }, 2000);
//       } catch (error) {
//         console.error("Registration Error:", error);
//         toast.error(error.message || "Registration failed.");
//       }
//     },
//   });

//   return (
//     <div className="box">
//       <h2>Sign Up</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formik.values.fullName}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             required
//           />
//           {formik.touched.fullName && formik.errors.fullName && (
//             <p className="error">{formik.errors.fullName}</p>
//           )}
//         </div>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="emailBox"
//             value={formik.values.emailBox}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             required
//           />
//           {formik.touched.emailBox && formik.errors.emailBox && (
//             <p className="error">{formik.errors.emailBox}</p>
//           )}
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             name="pass"
//             value={formik.values.pass}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             required
//           />
//           {formik.touched.pass && formik.errors.pass && (
//             <p className="error">{formik.errors.pass}</p>
//           )}
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Register;


import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import authService from "../../apiService/authApi";
import { Button } from "../../components/Button";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Name is required."),
  emailBox: Yup.string().email("Invalid Email").required("Email is required."),
  pass: Yup.string()
    .matches(/[0-9]/, "Password must contain at least 1 number.")
    .max(6, "Password should be max 6 characters.")
    .required("Password is required."),
});

const Register = () => {
  const goTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      emailBox: "",
      pass: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { fullName, emailBox, pass } = values;

      console.log("Attempting to register with:", { fullName, emailBox, pass });

      try {
        const body = {
          name: fullName,
          email: emailBox,
          password: pass,
        };
        const response = await authService.registerUser(body);

        console.log("Registration API Response:", response);
        toast.success("You are registered BROTHER!");

        const userId = response.data.id;
        const userToken = response.data.emailVerificationTOken;

        localStorage.setItem("userId", userId);
        localStorage.setItem("userToken", userToken);

        console.log("Stored in localStorage - userId:", userId, "userToken:", userToken);

        setTimeout(() => {
          const redirectUrl = `/email-verification/${emailBox}`;
          console.log("Redirecting to:", redirectUrl);
          goTo(redirectUrl);
        }, 2000);
      } catch (error) {
        console.error("Registration Error:", error);
        toast.error(error.message || "Registration failed.");
      }
    },
  });

  return (
    <div className="box">
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="error">{formik.errors.fullName}</p>
          )}
        </div>
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
        <Button type="submit">Sign Up</Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
