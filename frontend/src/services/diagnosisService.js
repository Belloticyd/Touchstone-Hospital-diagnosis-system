
// Import the necessary dependencies
import API from "./api";

// Create a function to fetch diagnosis data
export const createDiagnosis = async (data) => {

    // Start of TryCatchBlock
    try {
        // Make a POST request to the API to retrieve diagnosis data for a specific patient
        const response = await API.post("diagnosis", data);

        // Return the diagnosis data from the response
        return response.data;
    } catch (error) {
        // Log any errors that occur during the API request
        console.error("Error fetching diagnosis data:", error); 
    }
}

// Below code is used to get One Diagnosis data for a specific patient using their ID

export const getDiagnosis = async (patientId) => {

    // Start of TryCatchBlock
    try {
        // Make a GET request to the API to retrieve diagnosis data for a specific patient
        const response = await API.get(`diagnosis/${patientId}`);
        // Return the diagnosis data from the response
        return response.data;
    }
    catch (error) {
        // Log any errors that occur during the API request
        console.error("Error fetching diagnosis data:", error);
    }   
}



// Below code is used to get all the Diagnosis
export const getAllDiagnosis = async() =>{

    // Start of tryCatch Block
    try {
        const response = await API.get("diagnosis")

        return response.data
    } catch (error) {
        console.log("Unable to fetch the diagnosis for all the patients", error)
    }
}



// Export the createDiagnosis function to be used in other parts of the application
export default {
    createDiagnosis,
    getDiagnosis,
    getAllDiagnosis
};