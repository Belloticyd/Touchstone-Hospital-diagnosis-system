
// Import the necessary libraries and components
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Create a ProtectedRoute component to protect certain routes
// Start of the ProtectedRoute component function
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); // Get user and loading state from AuthContext
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return user ? children : <Navigate to="/" />;
    }
    return children;
};


export default ProtectedRoute;
