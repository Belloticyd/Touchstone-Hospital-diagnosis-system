

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import  getDiagnosisByPatient  from "../services/diagnosisService";
import  getLabResults  from "../services/labService";

const PatientHistory = () => {

    const [patientId, setPatientId] = useState("");
    const [diagnosis, setDiagnosis] = useState([]);
    const [labResults, setLabResults] = useState([]);


    const fetchHistory = async () => {
        try {
        const diag = await getDiagnosisByPatient(patientId);
        const labs = await getLabResults(patientId);

        setDiagnosis(diag);
        setLabResults(labs);

        } catch (err) {
        console.log(err);
        }
    };

  return (


    <Layout>
      <h1 className="text-2xl font-bold mb-4">Patient History</h1>

      <input
        placeholder="Enter Patient ID"
        className="border p-2 mr-2"
        onChange={(e) => setPatientId(e.target.value)}
      />

      <button
        onClick={fetchHistory}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {/* Diagnosis */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Diagnosis Records</h2>

        {diagnosis.map((d) => (
          <div key={d._id} className="bg-white p-4 shadow mt-2 rounded">
            <p><strong>Symptoms:</strong> {d.symptoms}</p>
            <p><strong>Diagnosis:</strong> {d.diagnosis}</p>
            <p><strong>Prescription:</strong> {d.prescription}</p>
          </div>
        ))}
      </div>

      {/* Lab Results */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Lab Results</h2>

        {labResults.map((l) => (
          <div key={l._id} className="bg-white p-4 shadow mt-2 rounded">
            <p><strong>Test:</strong> {l.testType}</p>
            <p><strong>Result:</strong> {l.result}</p>
          </div>
        ))}
      </div>
    </Layout>


  )
}

export default PatientHistory
