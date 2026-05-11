

// Import necessary libraries and components
import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../services/api";
import { AuthContext } from '../context/AuthContext';
import Users from './Users';



// create a Login component function
const Login = () => {
    
    const {setUser} = useContext(AuthContext); // Get setUser function from AuthContext

    const navigation = useNavigate(); // Get navigation function from react-router-dom

  

    const [form, setForm] = useState({
        email: "",
        password: ""
    }); // State for email input

    // Create a handleLogin function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post('users/login', form);
            console.log("Full Server Response:", res.data);

            // 1. Safely extract token and user
            const token = res.data.token || res.data.data?.token;
            const user = res.data.user || res.data.data?.user;

            if (!token) {
                console.error("Token is missing! Check backend response structure.");
                alert("Login failed: Server did not return a security token.");
                return;
            }

            // 2. Save everything to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); 

            // 3. Update the global state
            setUser(user); 

            alert('Login successful!');

            // 4. Navigate
            navigation('/dashboard'); 

        } catch (err) {
            console.error('Login failed:', err);
            alert(err.response?.data?.message || 'Login failed. Please try again.');
        }   
    };

    // Return the JSX for the login form
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Login Page</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-800" type="submit">
                    Login
                </button>

                {/* To register page */}
                <p className="text-center mt-8">
                    Don't have an account?{" "}<button className="text-blue-500 hover:text-blue-800 hover:underline cursor-pointer" onClick={() => navigation('/register')}>Register here</button>
                </p>
            </form>

        </div>
    );
};

export default Login;