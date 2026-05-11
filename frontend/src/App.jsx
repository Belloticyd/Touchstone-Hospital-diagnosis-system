// Import the BrowserRouter, Routes, and Route components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Import local  the created pages and components
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/ProtectedRoute"
import MissingPage from "./pages/MissingPage"
import Patients from "./pages/Patients"
import Users from "./pages/Users"
import Lab from "./pages/Lab"
import RoleRoute from "./components/RoleRoute"
import AddPatient from "./pages/AddPatient"
import Diagnosis from "./pages/Diagnosis";
import PatientHistory from "./pages/PatientHistory";

function App() {


  return (
    
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Users />} /> {/* Changed this to be the public register link */}

        {/* PROTECTED ROUTES - General */}
        <Route path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        {/* ROLE PROTECTED ROUTES */}
        <Route path="/patients"
          element={
            <RoleRoute allowedRoles={["admin", "receptionist"]}> 
              <Patients />
            </RoleRoute>
          }
        />

        <Route path="/add-patient"
          element={
            <RoleRoute allowedRoles={["admin", "receptionist"]}>
              <AddPatient />
            </RoleRoute>
          }
        />

        {/* Admin only Management */}
        <Route path="/admin/users"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <Users />
            </RoleRoute>
          }
        />

        <Route path="/diagnosis"
          element={ 
            <RoleRoute allowedRoles={["admin", "doctor"]}>
              <Diagnosis />
            </RoleRoute>
          }
        />

        <Route path="/lab"
          element={
            <RoleRoute allowedRoles={["admin", "doctor", "lab_technician"]}>
              <Lab />
            </RoleRoute>
          }
        />

        {/* CATCH ALL */}
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </Router>
    
  )
}

export default App
