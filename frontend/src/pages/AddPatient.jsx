
// Below code is used to import the React library, which is necessary for creating React components.
import { useState } from 'react';
import React from 'react'

// Below code is used to import local components and services that will be used in this component.
import Layout from '../components/Layout';
import { createPatient } from '../services/patientService';


const AddPatient = () => {
    const [formData, setFormData] = useState({
        names: '',
        age: '',
        gender: '',
        contact: '',
    });

    // Below code is used to handle Submit event of the form to create a new patient.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // start of try-catch block to handle any errors that may occur during the API call to create a new patient
        try {

            // Call the createPatient function to send the form data to the backend API
            await createPatient(formData); 
            alert('Patient New Record added successfully!'); // Show a success message to the user

            // Reset the form fields after successful submission
            setFormData({ names: '', age: '',gender:'', contact: '' }); 
        } catch (error) {

            // Log any errors that occur during the API call
            console.error('Unable to add new  patient:', error); 
            alert('Failed to add patient. Please try again.'); // Show an error message to the user
        }
    };


  return (
    <Layout>
        <h1 className="text-xl font-bold mb-4">Add New Patient</h1>

        <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
            <input
                placeholder="Name"
                className="w-full p-2 border"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
                placeholder="Age"
                type="number"
                className="w-full p-2 border"
                onChange={(e) => setForm({ ...form, age: e.target.value })}
            />

            <input
                placeholder="Gender"
                className="w-full p-2 border"
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
            />

            <input
                placeholder="Contact"
                className="w-full p-2 border"
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />

            <button className="bg-blue-500 text-white p-2 rounded cursor-pointer" type="submit">
                Add Patient
            </button>
        </form>
    </Layout>
  )
}

export default AddPatient
