


import React, {useState, useEffect} from 'react'

import Layout from '../components/Layout'
import { createDiagnosis } from '../services/diagnosisService'

const Diagnosis = () => {
  const [form, setForm] = useState({
     patientId: "",
    symptoms: "",
    diagnosis: "",
    prescription: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();

    setIsSubmitting(true);
    // Start of tryCatch Block
    try {
      await createDiagnosis(form);

      // Reset form or show success message
      setForm({
        patientId: "",
        symptoms: "",
        diagnosis: "",
        prescription: ""
      });
    } catch (error) {
      console.error("Error creating diagnosis:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Create Diagnosis Form for the Patient</h1>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">

        <input
          placeholder="Patient ID"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, patientId: e.target.value })
          }
        />

        <textarea
          placeholder="Symptoms"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, symptoms: e.target.value })
          }
        />

        <textarea
          placeholder="Diagnosis"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, diagnosis: e.target.value })
          }
        />

        <textarea
          placeholder="Prescription"
          className="w-full p-2 border"
          onChange={(e) =>
            setForm({ ...form, prescription: e.target.value })
          }
        />

        <button className="bg-blue-400 text-white p-2 rounded cursor-pointer hover:bg-blue-800" disabled={isSubmitting}>
          Save Diagnosis
        </button>
      </form>
    </Layout>
  )
}

export default Diagnosis
