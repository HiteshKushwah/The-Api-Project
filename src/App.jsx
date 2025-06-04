import { RouterProvider } from "react-router-dom";
import router from "./Router/routeConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  return (
    <div className="main" style={{ display: 'block', width: '100%' }}>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;