

// Controller functions for handling lab result operations
import { StatusCodes } from 'http-status-codes';


import LabResult from '../models/LabResult.js';

const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    FAILED: 'failed'
}


// CREATE Lab Result (Doctor and Admin)
// START OF CREATE ALL Lab Result FUNCTION for (ROLES)
// Function to create a new lab result
export const createLabResult = async (req, res) => {

    
    // Start of try catch block for error handling
  try {
    const { patientId, testType, result } = req.body;

    // If condition to check if the user has the required role to create a lab result
    if (!req.user || !req.user.id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: STATUS.ERROR,
            message: 'Authentication failed: User information missing'
        });
    }

    // Below code is used to create a new labresult
    const labResult = await LabResult.create({ 
        patientId, 
        testType, 
        result, 
        uploadedBy:  req.user.id || req.user.userId || req.user._id 

    });

    // Below code is used to save it inside the database
    // await labResult.save();

    // Return the saved lab result in the response
    res.status(StatusCodes.CREATED).json({
        status: STATUS.SUCCESS,
        message: 'Lab result created successfully',
        data: labResult
    });


  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
        status: STATUS.ERROR,
        message: 'Failed to create lab result',
        errors: error.message   
     });
  }
};
// END OF CREATE ALL Lab Result FUNCTION for (ROLES)



// GET Lab Result BY PATIENT ID (Doctor and Admin)
// START OF GET Lab Result BY PATIENT ID FUNCTION for (ROLES)
export const getLabResultsByPatientId = async (req, res) => {

    // Start of try catch block for error handling
  try {
    const { patientId } = req.params;
    // Below code is used to find the lab result by patient ID
    const labResults = await LabResult.find({ patientId }).sort({ createdAt: -1 });

    // If no lab results are found for the specified patient ID, return a 404 response
    if (!labResults || labResults.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
            status: STATUS.FAILED,
            message: 'No lab results found for the specified patient ID'
        });
    }

    res.status(StatusCodes.OK).json({
        status: STATUS.SUCCESS,
        message: 'Lab results retrieved successfully',
        data: labResults
    });

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: STATUS.ERROR,
        message: 'Failed to retrieve lab results for the specified patient ID',
        errors: error.message
    });
  }
};
// END OF GET Lab Result BY PATIENT ID FUNCTION for (ROLES)



// GET all Lab Result  (Doctor and Admin)
// START OF GET ALL Lab Result FUNCTION for (ROLES)
export const getAllLabResults = async (req, res) => {

    // Start of try catch block for error handling
    try {
        const labResults = await LabResult.find();

        res.status(StatusCodes.OK).json({
            status: STATUS.SUCCESS,
            message: 'All lab results retrieved successfully',
            data: labResults
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: 'Failed to retrieve all lab results',
            errors: error.message
        });
    }
};
// END OF GET ALL Lab Result FUNCTION for (ROLES)


// UPDATE Lab Result BY PATIENT ID (Doctor and Admin)
// START OF UPDATE Lab Result BY PATIENT ID FUNCTION for (ROLES)
// Function to update a lab result by patient ID
export const updateLabResultByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { testType, result } = req.body;
        // Below code is used to find the lab result by patient ID and update it
        const labResult = await LabResult.findOneAndUpdate(
            { patientId },
            { testType, result, updatedAt: Date.now() },
            { new: true }
        );

        if (!labResult) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: STATUS.ERROR,
                message: 'Lab result not found'
            });
        }

        res.status(StatusCodes.OK).json({
            status: STATUS.SUCCESS,
            message: 'Lab result updated successfully',
            data: labResult
        });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: 'Failed to update lab result',
            errors: error.message
        });
    }
};
// END OF UPDATE Lab Result BY PATIENT ID FUNCTION for (ROLES)





export default {
    createLabResult,
    getLabResultsByPatientId,
    getAllLabResults,
    updateLabResultByPatientId
};
