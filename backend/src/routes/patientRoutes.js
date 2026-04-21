

// Below code is used to import the necessary modules and dependencies for the Express application. 
import express from 'express';


import { createPatient, getAllPatients } from '../controllers/patientController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Doctor and Admin can creates diagnosis, Reception and Admin can add patient
router.post('/', authMiddleware, authorizeRoles('receptionist', 'admin'), createPatient);

// Doctors and Nurses can view patients
router.get('/', 
    authMiddleware, 
    authorizeRoles('admin', 'doctor', 'nurse', 'patient',
        'radiographer', 'sonographer', 'lab_technician', 
        'pharmacist', 'receptionist', 'accountant', 
        'hr_manager', 'it_support','receptionist'
    ),
    getAllPatients
);

export default router;




