
import { StatusCodes } from 'http-status-codes';

import Diagnosis from '../models/Diagnosis.js';

const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    FAILED: 'failed'
}

// CREATE DIAGNOSIS (Doctor and Admin)
// START OF CREATE ALL DIAGNOSIS FUNCTION for (ROLES)
export const createDiagnosis = async (req, res) => {
  // Start of try catch block for error handling
  try {

    // 
    const { patientId, diagnosis, symptoms, prescription } = req.body;

    // Below code is used to validate the user data
    if (!req.user || !req.user.id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: STATUS.ERROR,
        message: 'Authentication failed: No user found on request'
      });
    }

    // Below code is used to create a new patient
    const newDiagnosis = await Diagnosis.create({
      patientId,
      doctorId: req.user.id, // Use the authenticated user's ID as the doctorId
      diagnosis,
      symptoms,
      prescription
    });

    // Below code is used to save it inside the database
    const savedDiagnosis = await newDiagnosis.save();

    // Return the saved diagnosis in the response
    res.status(StatusCodes.CREATED).json({
      status: STATUS.SUCCESS,
      message: 'Diagnosis created successfully',
      data: savedDiagnosis
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: STATUS.ERROR,
      message: 'Failed to create diagnosis',
      errors: error.message
    });
  }
};
// END OF CREATE ALL DIAGNOSIS FUNCTION for (ROLES)


// GET DIAGNOSIS BY PATIENT ID (Doctor and Admin)
// START OF GET DIAGNOSIS BY PATIENT ID FUNCTION for (ROLES)
export const getDiagnosisByPatientId = async (req, res) => {

  // Start of try catch block for error handling
  try {
    const { patientId } = req.params;

    // Below code is used to find diagnosis by patient ID
    const diagnosis = await Diagnosis.find({ patientId }).sort({ createdAt: -1 }); //.populate("doctorId", "name email").populate("patientId", "name age"); // Sort by creation date (newest first)

    // If no diagnosis is found for the specified patient ID, return a 404 response
    if (!diagnosis || diagnosis.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: STATUS.FAILED,
        message: 'No diagnosis found for the specified patient ID'
      });
    }

    res.status(StatusCodes.OK).json({
      status: STATUS.SUCCESS,
      message: 'Diagnosis found successfully',
      data: diagnosis
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: STATUS.ERROR,
      message: 'Failed to retrieve diagnosis for the specified patient ID',
      errors: error.message
    });
  }
};
// END OF GET DIAGNOSIS BY PATIENT ID FUNCTION for (ROLES)


// START OF GET ALL DIAGNOSIS FUNCTION for (ROLES)
export const getAllDiagnosis = async (req, res) => {
  
  // Start of try catch block for error handling
  try {
    
    // Below code is used to find all diagnosis
    const diagnosis = await Diagnosis.find().sort({ createdAt: -1 }); // Sort by creation date (newest first)
    res.status(StatusCodes.OK).json({
      status: STATUS.SUCCESS,
      message: 'Diagnosis retrieved successfully',
      data: diagnosis
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: STATUS.ERROR,
      message: 'Failed to retrieve diagnosis',
      errors: error.message
    });
  }
};
// END OF GET ALL DIAGNOSIS FUNCTION for (ROLES)


// UPDATE DIAGNOSIS BY PATIENT ID (Doctor and Admin)
// START OF UPDATE DIAGNOSIS BY PATIENT ID FUNCTION for (ROLES)
export const updateDiagnosisByPatientId = async (req, res) => {
  // Start of try catch block for error handling
  try {
    const { patientId } = req.params;
    const { diagnosis, symptoms, prescription } = req.body;

    // Find the diagnosis by patient ID
    const diagnosisToUpdate = await Diagnosis.findOne({ patientId });

    // If no diagnosis is found for the specified patient ID, return a 404 response
    if (!diagnosisToUpdate) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: STATUS.FAILED,
        message: 'No diagnosis found for the specified patient ID'
      });
    }

    // Update the diagnosis
    diagnosisToUpdate.diagnosis = diagnosis;
    diagnosisToUpdate.symptoms = symptoms;
    diagnosisToUpdate.prescription = prescription;

    // Save the updated diagnosis
    const updatedDiagnosis = await diagnosisToUpdate.save();

    res.status(StatusCodes.OK).json({
      status: STATUS.SUCCESS,
      message: 'Diagnosis updated successfully',
      data: updatedDiagnosis
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: STATUS.ERROR,
      message: 'Failed to update diagnosis',
      errors: error.message
    });
  }
};
// END OF UPDATE DIAGNOSIS BY PATIENT ID FUNCTION for (ROLES)

export default {
  createDiagnosis,
  getDiagnosisByPatientId,
  getAllDiagnosis,
  updateDiagnosisByPatientId
};
