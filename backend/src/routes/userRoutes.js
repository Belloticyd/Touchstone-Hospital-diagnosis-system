
// Below code is used to import the necessary modules 
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

import { registerUser,
    loginUser
 } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', 
        user: req.user 
    });
});

// below code is used to create Roles base routes
router.get('/admin', authMiddleware, authorizeRoles('admin'), (req, res) => {
    res.json({ 
        message: 'Welcome Admin! This is a protected route for admin users only.',
        user: req.user 
    });
});

// Below code is used to create a route for doctors
router.post('/diagnose', authMiddleware, authorizeRoles('doctor', 'admin'), (req, res) => {
    res.json({
        message: 'Welcome Doctor! This is a protected route for doctor users only.',
        user: req.user 
    });
});


// Below code is used to create a route for staff members with multiple roles
router.get('/staff', authMiddleware, authorizeRoles('doctor', 'admin'), (req, res) => {
    res.json({
        message: 'Welcome Staff! This is a protected route for staff users with either staff or admin roles.',
        user: req.user 
    });
});


// Below code is used to create a route for patients
router.get('/receptionist', authMiddleware, authorizeRoles('receptionist'), (req, res) => {
    res.json({  
        message: 'Welcome Receptionist! This is a protected route for receptionist users only.',
        user: req.user 
    });
});


export default router;
