

// Route definitions for lab result operations
import express from 'express';

// Importing controller functions and middleware for authentication and role-based access control.
import {createLabResult,
    getLabResultsByPatientId,
    updateLabResultByPatientId,
    getAllLabResults
} from '../controllers/labController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizeRoles  from '../middlewares/roleMiddleware.js';


const router = express.Router();

// Route for creating a new lab result (accessible by lab technicians and admins)
router.post('/', authMiddleware, authorizeRoles('lab_technician', 'admin'), createLabResult);

// Route for retrieving lab results by patient ID (accessible by lab technicians and admins)
router.get('/:patientId', authMiddleware, authorizeRoles(
    'lab_technician', 'admin', 'doctor',
    'radiographer', 'sonographer', 'lab_technician', 
    'pharmacist', 'receptionist', 'accountant', 'hr_manager', 'it_support','receptionist'
), getLabResultsByPatientId);


// Route for updating a lab result by patient ID (accessible by lab technicians and admins)
router.get('/', authMiddleware, authorizeRoles(
    'lab_technician', 'admin', 'doctor',
    'radiographer', 'sonographer', 'lab_technician', 
    'pharmacist', 'receptionist', 'accountant', 'hr_manager', 'it_support','receptionist'
), getAllLabResults);


// Route for updating a lab result by patient ID (accessible by lab technicians and admins)
router.put('/:patientId', authMiddleware, authorizeRoles(
    'lab_technician', 'admin', 'doctor',
    'radiographer', 'sonographer', 'lab_technician', 
    'pharmacist', 'receptionist', 'accountant', 'hr_manager', 'it_support','receptionist'
), updateLabResultByPatientId);


export default router;