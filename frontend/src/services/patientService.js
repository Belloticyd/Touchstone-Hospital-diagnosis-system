
// Below code is used importing the axios library to make HTTP requests to the backend API.
import API from './api';


// GET ALL PATIENTS
export const getAllPatients = async () => {

    // Start a try-catch block to handle potential errors during the API call
    try {
        const response = await API.get('patients');
        return response.data;
    } catch (error) {
        console.error('Could not fetch patients:', error);
        throw error;
    }
    // End of the try-catch block
};

// GET A SINGLE PATIENT BY ID
export const getPatientById = async (id) => {
    try {
        const response = await API.get(`patients/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Could not fetch patient with ID ${id}:`, error);
        throw error;
    }
};

// CREATE A NEW PATIENT
export const createPatient = async (patientData) => {
    try {

        const response = await API.post('patients', patientData);
        return response.data;
        
    } catch (error) {
        console.error('Could not create patient:', error);
        throw error;
    }
};

// UPDATE AN EXISTING PATIENT
export const updatePatient = async (id, patientData) => {
    try {
        const response = await API.put(`patients/${id}`, patientData);
        return response.data;
    } catch (error) {
        console.error(`Could not update patient with ID ${id}:`, error);
        throw error;
    }
};
