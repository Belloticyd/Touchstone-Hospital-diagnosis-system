
// Importing React library to create a functional component for the Dashboard page

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Dashboard = () => {
    const { user, setUser } = useContext(AuthContext); 
    const navigate = useNavigate();

    // Start of the handleLogout function
    const handleLogout = () => {
      // Remove the token from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // If you saved user data there too

      // Reset the AuthContext state
      setUser(null);

      // Send the user back to the login page
      navigate('/login');
    };
    // End of the handleLogout function

    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
                Welcome, {user?.name || user?.names || "User"}!
            </h1>
            <p className="text-gray-600 mb-4">
                Logged in as: <span className="font-semibold uppercase">{user?.role}</span>
            </p>
            
            <div className="border-t pt-4">
                <p className="mb-6 text-gray-500">This is your hospital management dashboard.</p>
                
                <button 
                    onClick={handleLogout}
                    className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition duration-200 cursor-pointer"
                >
                    Logout
                </button>
            </div>
          </div>
        </div>
      </Layout>
    );
};

export default Dashboard;