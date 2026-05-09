
// Import necessary libraries and components

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Create a RoleRoute component to handle role-based access control
const RoleRoute = ({ children, allowedRoles }) => {

    // Get the current user from AuthContext
    const { user } = useContext(AuthContext); 

    // Check if the user is authenticated and has an allowed role
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default RoleRoute;