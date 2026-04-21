
import httpStatuscode from 'http-status-codes';

const STATUS = {     
    SUCCESS: 'success',
    ERROR: 'error',
    FAILED: 'failed'
}

// Below code is used to create a authorize Role middleware function
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {   
            return res.status(httpStatuscode.FORBIDDEN).json({
                status: STATUS.FAILED,
                message: 'Forbidden: You do not have permission to access this resource'
            });
        }   
        next();
    };
};

export default authorizeRoles;