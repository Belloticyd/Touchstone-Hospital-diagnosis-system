// Import the Mongodb connection and Mongoose library
import mongoose from 'mongoose';

// Define the User schema using Mongoose
const userSchema = new mongoose.Schema({
  names: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: [
        'admin', 'doctor', 'nurse', 'patient',
        'radiographer', 'sonographer', 'lab_technician', 
        'pharmacist', 'receptionist', 'accountant', 'hr_manager', 'it_support',
        'domestic_staff', 'security_personnel', 'volunteer'
    ], default: 'receptionist' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Create a Mongoose model for the User schema

// module.exports = mongoose.model('User', userSchema);


const User = mongoose.model('User', userSchema);
export default User;

