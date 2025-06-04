import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
        return children;
    }
    else return <Navigate to={'/'} />;
}

export default PrivateRoute;