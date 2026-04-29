
// Import necessary modules and libraries
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status-codes';

const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    FAILED: 'failed'
}

// Below code is used to create or register a new user
// START OF REGISTER NEW USER FUNCTION
export const registerUser = async (req, res) => {
    // Start of try catch block for error handling
    try {
        const { names, email, password, role } = req.body;

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: STATUS.FAILED, 
                message: 'User already exists' 
            });
        }

        // Password hashing using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // End of password hashing


        // Create a new user instance with the provided data and hashed password
        const newUser = await User.create({
            names,
            email,
            password: hashedPassword,
            role
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message and the created user data (excluding the password)
        res.status(httpStatus.OK).json({
            status: STATUS.SUCCESS,
            message: 'New user registered successfully',
            data: {
                user: {
                    id: newUser._id,
                    names: newUser.names,
                    email: newUser.email,
                    role: newUser.role,
                    createdAt: newUser.createdAt
                }
            }
        });


       
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: 'An error occurred while registering new user',
            error: error.message
        });
    }
};
// END OF REGISTER NEW USER FUNCTION


// START OF LOGIN FUNCTION
export const loginUser = async (req, res) => {
    // Start of try catch block for error handling
    try {
        const { email, password } = req.body;

            // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: STATUS.FAILED, 
                message: 'Invalid email or password' 
            });
        }
        // End of user existence check

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password is invalid, respond with an error message
        if (!isMatch) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: STATUS.FAILED, 
                message: 'Invalid email or password' 
            });
        }

        // If the password is valid, generate a JWT token for authentication
        const token = jwt.sign(
            { 
                id: user._id || user.id || user.userId,
                role: user.role 
             }, // Payload containing user ID and role
            process.env.JWT_SECRET, // Secret key for signing the token (should be stored in environment variables)
            { expiresIn: '7d' } // Token expiration time (e.g., 1 hour)
        );

        // Respond with a success message and the generated token
        res.status(httpStatus.OK).json({
            status: STATUS.SUCCESS,
            message: 'User logged in successfully',
            data: {
                token,
                user: {
                    id: user._id,
                    names: user.names,
                    email: user.email,
                    role: user.role
                }

            }
        });

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: 'An error occurred while logging in',
            error: error.message
        });
    }
}
// END OF LOGIN FUNCTION

export default {
    registerUser, 
    loginUser,
};