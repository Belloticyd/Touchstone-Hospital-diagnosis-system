
// Import necessary libraries and components
import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../services/api";
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../services/userService';


const Users = () => {
  const [userData, setUserData] = useState({
    "names": "",
    "email": "",
    "password": "",
    "role": ""
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(userData);
      console.log("User registered:", response);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <h2>Register New User</h2>
      <form onSubmit={handleRegister} className='bg-white p-6 rounded shadow w-80'>
        <input
          type="text"
          placeholder="Name"
          value={userData.names}
          className="w-full mb-3 p-2 border"
          onChange={(e) => setUserData({ ...userData, names: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          className="w-full mb-3 p-2 border"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          className="w-full mb-3 p-2 border"
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <select
          value={userData.role}
          className="w-full mb-3 p-2 border"
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="patient">Patient</option>
          <option value="radiographer">Radiographer</option>
          <option value="sonographer">Sonographer</option>
          <option value="lab_technician">Lab Technician</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="receptionist">Receptionist</option>
          <option value="accountant">Accountant</option>
          <option value="hr_manager">HR Manager</option>
          <option value="it_support">IT Support</option>
          <option value="domestic_staff">Domestic Staff</option>
          <option value="security_personnel">Security Personnel</option>
          <option value="volunteer">Volunteer</option>
        </select>
        <button className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-800" type="submit">
          Register
        </button>
      </form>
    </div>
  )
}

export default Users


