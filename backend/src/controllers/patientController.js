
// Import necessary modules and libraries
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import statusCode from 'http-status-codes';


import Patient from '../models/Patient.js';

const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    FAILED: 'failed'
}


// Below code is used to create a Patient controller function
// START OF CREATE NEW PATIENT FUNCTION for (RECEPTIONIST ONLY)
export const createPatient = async (req, res) => {

    // Start of try catch block for error handling
    try {
        const { names, age, gender, contactInfo } = req.body;

        // Below code is used to create a new patient
        const patient = await  Patient.create({
            names,
            age,
            gender,
            contactInfo
        });

        // Below code is used to save it inside the database
        await patient.save();

        res.status(statusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Patient created successfully',
            data: patient
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: 'Failed to create patient',
            error: error.message
        });
    }
};
// END OF CREATE NEW PATIENT FUNCTION for (RECEPTIONIST ONLY)


// Below code is used to get all patients
// START OF GET ALL PATIENTS FUNCTION for (ROLES)
export const getAllPatients = async (req, res) => {

    // Start of try catch block for error handling
    try {

        const patients = await Patient.find().sort({ createdAt: -1 }); // Sort by creation date (newest first)

        res.status(statusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Patients retrieved successfully',
            data: patients
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: 'Failed to retrieve patients',
            error: error.message
        }); 
    }
};
// END OF GET ALL PATIENTS FUNCTION for (ROLES)



// export all the functions as a default object for use in other modules (like routes)
export default {
    createPatient,
    getAllPatients
};
