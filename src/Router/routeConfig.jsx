import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import EmailVerification from '../Pages/Auth/EmailVerification';
import Dashboard from '../Pages/User/Dashboard';
import UserDetails from '../Pages/User/UserDetails';
import EditUser from '../Pages/User/EditUser';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import ResetPassword from '../Pages/Auth/ResetPassword';

const router = createBrowserRouter([
  { path: '*', element: <Login /> },
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/email-verification/:email', element: <EmailVerification /> },
  { path: '/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
  { path: '/user/:id/:token', element: <PrivateRoute><UserDetails /></PrivateRoute> },
  { path: '/edit-user/:id/:token', element: <PrivateRoute><EditUser /></PrivateRoute> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/auth/reset-password/:id/:token', element: <ResetPassword /> },
]);

export default router;