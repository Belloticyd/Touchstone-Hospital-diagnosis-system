
// Importing the neecessary modules and dependencies
import API from "./api";

// Below code is used to create a new lab report for a specific patient
export const createLabReport = async (data) => {
    try {
        const response = await API.post("lab-reports", data);
        return response.data;
    } catch (error) {
        console.error("Error creating lab report:", error);
    }
};


// Below code is used to get all the lab reports for a specific patient using their ID
export const getLabReportsByPatientId = async (patientId) => {
    try {   
        const response = await API.get(`lab-reports/patient/${patientId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching lab reports for patient:", error);
    }
};

// Below code is used to get all the lab reports in the system
export const getAllLabReports = async () => {
    try {
        const response = await API.get("lab-reports");
        return response.data;
    } catch (error) {
        console.error("Error fetching all lab reports:", error);
    }
};

// Export the functions to be used in other parts of the application
export default {
    createLabReport,
    getLabReportsByPatientId,
    getAllLabReports
};

