
// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import authService from "../../apiService/authApi";

// function ForgotPassword() {
//   const [emailBox, setEmailBox] = useState("");
//   const goTo = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const body = {
//         email: emailBox,
//       };
//       const response = await authService.forgotPassword(body);
//       console.log("Forgot Password Response:", response);

//       toast.success("Password reset link has been sent to your Email");

//       setTimeout(() => {
//         goTo("/");
//       }, 2000);
//     } catch (error) {
//       console.error("Forgot Password Error:", error);
//       toast.error(error.message || "An error occurred.");
//     }
//   };

//   return (
//     <div className="box">
//       <ToastContainer />
//       <h3 style={{ fontFamily: "Algerian" }}>Forgot password</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email</label>
//           <input
//             onChange={(event) => setEmailBox(event.target.value)}
//             placeholder="Enter your Email"
//             type="email"
//             required
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default ForgotPassword;



import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authService from "../../apiService/authApi";
import { Button } from "../../components/Button";

function ForgotPassword() {
  const [emailBox, setEmailBox] = useState("");
  const goTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email: emailBox,
      };
      const response = await authService.forgotPassword(body);
      console.log("Forgot Password Response:", response);

      toast.success("Password reset link has been sent to your Email");

      setTimeout(() => {
        goTo("/");
      }, 2000);
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <div className="box">
      <ToastContainer />
      <h3 style={{ fontFamily: "Algerian" }}>Forgot password</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            onChange={(event) => setEmailBox(event.target.value)}
            placeholder="Enter your Email"
            type="email"
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
