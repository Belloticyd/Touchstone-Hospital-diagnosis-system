
// Below code is used to import mongoose and define the schema for the Patient model. It includes fields for the patient's record:- name, age, gender, contact information, and medical history. The schema also includes timestamps for when the patient record was created and last updated.
import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;

