

// Below code is used to import the necessary modules and dependencies for the LabResult model.
import mongoose from 'mongoose';

// Define the LabResult schema using Mongoose
const labResultSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
    },
    testType: {
    type: String,
    required: true
    },
    result: {
    type: String,
    required: true
    },
    uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    createdAt: { 
    type: Date, 
    default: Date.now
    },
    updatedAt: { 
    type: Date,
    default: Date.now
    }
}, {
  timestamps: true
});


const LabResult = mongoose.model('LabResult', labResultSchema);
export default LabResult;