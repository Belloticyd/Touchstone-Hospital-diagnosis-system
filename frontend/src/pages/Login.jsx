

// Import necessary libraries and components
import  { useState, useContext } from 'react';
import API from "../services/api";
import { AuthContext } from '../context/AuthContext';



// create a Login component function
const Login = () => {
    
    const {setUser} = useContext(AuthContext); // Get setUser function from AuthContext

    const [form, setForm] = useState({
        email: "",
        password: ""
    }); // State for email input

    // Create a handleLogin function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Start of try block to handle login logic
        try {
            // Send a POST request to the login endpoint with the form data
            const res = await API.post('users/login', form);

            localStorage.setItem('token', res.data.token); // Store the token in localStorage
            setUser(res.data.user); // Update the user state in AuthContext with the logged-in user's data

            alert('Login successful!'); // Alert the user of successful login

        } catch (err) {
            console.error('Login failed:', err);
            alert(err.response?.data?.message || 'Login failed. Please try again.'); // Alert the user of login failure with an error message
        }   
    };

    // Return the JSX for the login form
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
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
            </form>
        </div>
    );
};

export default Login;