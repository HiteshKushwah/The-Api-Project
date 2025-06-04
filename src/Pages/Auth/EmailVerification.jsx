
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import authService from "../../apiService/authApi";

const EmailVerification = () => {
  const [msg, setMsg] = useState('');
  const goTo = useNavigate();

  const { email: userEmail } = useParams();

  const userId = localStorage.getItem("userId");
  const userToken = localStorage.getItem("userToken");

  console.log('EmailVerification component loaded.');
  console.log('Extracted from URL - Email:', userEmail);
  console.log('Extracted from localStorage - User ID:', userId, 'Token:', userToken);

  const verifyNow = async () => {
    if (!userId || !userToken) {
      setMsg('Verification failed. No user ID or token found.');
      toast.error('No user ID or token found. Please sign up again.');
      console.log('No userId or userToken found. Redirecting to /register in 2 seconds.');
      setTimeout(() => goTo('/register'), 2000);
      return;
    }

    setMsg('Verifying your email...');
    console.log('Verification initiated. Sending to backend...');

    try {
      const params = {
        userId,
        token: userToken,
      };
      const response = await authService.verifyEmail(params);

      console.log('Backend Verification Response:', response);

      setMsg('Email verified!');
      toast.success('Email verified ho chuka hai!');
      console.log('Email successfully verified. go to /login in 2 seconds.');
      setTimeout(() => goTo('/login'), 2000);
    } catch (err) {
      console.error('Email verification failed:', err);
      setMsg('Verification failed. Try signing up again.');
      toast.error(err.message || 'Verification failed.');
      console.log('Verification failed. Redirecting to /register in 2 seconds.');
      setTimeout(() => goTo('/register'), 2000);
    }
  };

  return (
    <div className="box">
      <h2>Verify Email</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={userEmail || ''}
          disabled
        />
      </div>
      <button onClick={verifyNow}>Verify Now</button>
      {msg && (
        <p className={msg.includes('failed') ? 'error' : 'success'}>
          {msg}
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;
