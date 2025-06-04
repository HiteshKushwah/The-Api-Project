import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../apiService/userApi";

const UserDetails = () => {
  const { id, token } = useParams();
  const goTo = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setProblem("");
      console.log(`Attempting to fetch details for user ID: ${id}`);

      try {
        const response = await userService.getUserDetails({ userId: id });

        console.log("Fetch Response:", response);
        const fetchedUser = response.user || response || null;

        if (!fetchedUser) {
          console.warn("User data not found in API response.");
          throw new Error("User data not found in response");
        }

        console.log("User details received successfully.");
        setUserDetails(fetchedUser);
      } catch (err) {
        console.error("Fetch error:", err);
        setProblem(err.message || "Failed to fetch user details.");
      } finally {
        setLoading(false);
        console.log("User details fetching process complete.");
      }
    };

    fetchUserDetails();
  }, [id, token, goTo]);

  const handleEdit = () => {
    console.log(`Navigating to edit page for user ID: ${id}`);
    goTo(`/edit-user/${id}/${token}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this user?")) {
      try {
        console.log(`Attempting to delete user ID: ${id} with token: ${token}`);
        const response = await userService.deleteUser({ userId: id });

        console.log("Delete Response:", response);
        toast.success("User deleted successfully.");
        setTimeout(() => {
          goTo(-1);
        }, 2000);
      } catch (err) {
        console.error("Delete error:", err);
        const errorMsg = err.message || "Failed to delete user.";
        setProblem(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="box">
      <h2>User Details</h2>
      {loading && <p>Loading user details...</p>}
      {problem && <p className="error">{problem}</p>}
      {userDetails ? (
        <table className="user-details-table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{userDetails.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{userDetails.email}</td>
            </tr>
            <tr>
              <th>Email Verified</th>
              <td>{userDetails.isEmailVerified ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        !loading && !problem && <p>No user details found.</p>
      )}
      <div className="button-group">
        <button onClick={() => goTo(-1)} className="back-btn">
          Back to Dashboard
        </button>
        <button onClick={handleEdit} className="edit-btn">
          Edit
        </button>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
