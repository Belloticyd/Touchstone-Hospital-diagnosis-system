
import { useState } from "react";
import Layout from "../components/Layout";
import createLabResult  from "../services/labService";

const Lab = () => {
  const [form, setForm] = useState({
    patientId: "",
    testType: "",
    result: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createLabResult(form);
      setForm({
        patientId: "",
        testType: "",
        result: ""
      });
    } catch (error) {
      console.error("Error creating lab result:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Create New Lab Result</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
        <input
          placeholder="Patient ID"
          className="w-full p-2 border"
          onChange={handleChange}
          name="patientId"
        />
        <input
          placeholder="Test Type"
          className="w-full p-2 border"
          onChange={handleChange}
          name="testType"
        />
        <textarea
          placeholder="Result"
          className="w-full p-2 border"
          onChange={handleChange}
          name="result"
        />
        <button
          className="bg-blue-400 text-white p-2 rounded cursor-pointer hover:bg-blue-800"
          disabled={isSubmitting}
        >
          Save Lab Result
        </button>
      </form>
    </Layout>
  )
}



export default Lab
