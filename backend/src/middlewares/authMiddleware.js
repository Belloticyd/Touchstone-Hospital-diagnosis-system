
// Below code is used to import the necessary modules and libraries for the user controller. It includes the User model for interacting with the users collection in the database, bcryptjs for hashing passwords, jsonwebtoken for creating and verifying JWT tokens, and http-status-codes for standardized HTTP status codes.
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status-codes';


const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    FAILED: 'failed'
}

// Below code is used to create Authentication middleware that will be used to protect routes that require authentication. 
// Start of Authentication middleware function

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: STATUS.FAILED,
            message: 'Unauthorized User: Invalid or missing token'
        });
    }

    const token = authHeader.split(" ")[1]; // Remove 'Bearer ' prefix

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`id is ${decoded}`)
        req.user = {
            id: decoded.id || decoded.userId || decoded._id, 
            role: decoded.role
            };
        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: STATUS.FAILED,
            message: 'Unauthorized: Invalid Users token'
        });
    }
};
// End of Authentication middleware function


export default authMiddleware;
