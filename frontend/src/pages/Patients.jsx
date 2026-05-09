
// Importing the necessary libraries and components
import React from 'react'
import { useEffect, useState } from 'react';

// importing local components
import Layout from '../components/Layout';
import { getPatients } from '../services/api'; // Import the API function to fetch patients data



const Patients = () => {
    const [patients, setPatients] = useState([]);

    // Below code is used to fetch patients data from the API.
    useEffect(() => {
        const fetchPatients = async () => {

          // Start of try-catch block to handle any errors that may occur during the API call
            try {

                // Call the API function to fetch patients data
                const data = await getPatients(); 
                setPatients(data); // Update the state with the fetched data
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        // End of try-catch block

        // Below code is used to call the fetchPatients function when the component mounts
        fetchPatients();
    }, []); // Empty dependency array to run the effect only once on component mount



  return (
    <Layout>

      <div>
        <h1 className="text-xl font-bold mb-4">Patients</h1>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Age</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Contact</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.names}</td>
                <td className="p-2">{p.age}</td>
                <td className="p-2">{p.gender}</td>
                <td className="p-2">{p.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>   
  )
}

export default Patients
