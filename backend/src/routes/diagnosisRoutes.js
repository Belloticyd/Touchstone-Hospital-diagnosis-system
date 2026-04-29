


// Below code is used to import the necessary modules and dependencies for the Express application. 
import express from 'express';


// Importing controller functions and middleware for authentication and role-based access control.
import { 
    createDiagnosis, 
    getDiagnosisByPatientId, 
    getAllDiagnosis,
    updateDiagnosisByPatientId

} from '../controllers/diagnosisController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizeRoles  from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Route for creating a new diagnosis (accessible by doctors and admins)
router.post('/', authMiddleware, authorizeRoles('doctor', 'admin'), createDiagnosis);

// Route for retrieving all diagnoses (accessible by doctors and admins)
router.get('/', authMiddleware,
        authorizeRoles('admin', 'doctor', 'nurse', 'patient',
        'radiographer', 'sonographer', 'lab_technician', 
        'pharmacist', 'receptionist', 'accountant', 
        'hr_manager', 'it_support','receptionist'), getAllDiagnosis
);


// Route for retrieving diagnosis by patient ID (accessible by doctors and admins)
router.get('/:patientId', authMiddleware, 
    authorizeRoles('admin', 'doctor', 'nurse', 'patient',
        'radiographer', 'sonographer', 'lab_technician', 
        'pharmacist', 'receptionist', 'accountant', 
        'hr_manager', 'it_support','receptionist'), getDiagnosisByPatientId
);


// Route for updating diagnosis by patient ID (accessible by doctors and admins)
router.put('/:patientId', authMiddleware, authorizeRoles('doctor', 'admin'), updateDiagnosisByPatientId);   




export default router;
