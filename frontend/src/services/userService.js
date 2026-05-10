// importing the API client
import API from "./api";

// Below code is used to register a new user in the system
export const registerUser = async (data) => {
    try {
        const response = await API.post("auth/register", data); 
        
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
    }   
};

// Below code is used to login a user and retrieve the authentication token
export const loginUser = async (data) => {
    try {
        const response = await API.post("auth/login", data);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
    }
};

// Below code is used to get the details of a user by their ID
export const getUserById = async (userId) => {
    try {
        const response = await API.get(`users/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching user details:", error);
    }
};

// Export the functions to be used in other parts of the application
export default {
    registerUser,   
    loginUser,
    getUserById
};
