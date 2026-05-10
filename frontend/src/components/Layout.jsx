
// import necessary libraries and components
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const Layout = ({ children}) => {

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Create a handleLogout function to handle user logout


  return (

    <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">Hospital System</h2>

            <ul className="space-y-3">
                {user?.role === "admin" && (
                    <>
                        <li className='cursor-pointer'>Manage Users</li>
                        <li className='cursor-pointer'>Dashboard</li>
                        <li className='cursor-pointer'>Patients</li>
                        <li className='cursor-pointer'>Add Patient</li>
                        <li className='cursor-pointer'>View Patients Record </li>
                        <li className='cursor-pointer'>Update Patients Record</li>
                        <li className='cursor-pointer'>Lab Results</li>
                        <li className='cursor-pointer'>Create Diagnosis</li>
                    </>
                )}

                {user?.role === "doctor" && (
                    <>
                        <li className='cursor-pointer'>
                            View Patients Records
                        </li>
                        <li className='cursor-pointer'>
                            Create Diagnosis
                        </li>
                    </>
                )}

                {user?.role === "lab" && (
                    <>
                        <li className='cursor-pointer'>
                            View Patients Records
                        </li>
                        <li className='cursor-pointer'>
                            Lab Results
                        </li>
                    </>
                    )}

                {user?.role === "reception" && (
                    <>
                        <li className='cursor-pointer'>
                            Add Patient
                        </li>
                        <li className='cursor-pointer'>
                            View Patients Record 
                        </li>
                        <li className='cursor-pointer'>
                            Update Patients Record 
                        </li>
                    </>
                )}
            </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100">
            {children}
        </div>
    </div>
  )
}

export default Layout
