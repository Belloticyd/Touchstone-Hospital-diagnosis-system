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

function App() {


  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* The Patients Route */}
        <Route path="/patients"
          element={
            <RoleRoute allowedRoles={["admin", "reception"]}>
              <Patients />
            </RoleRoute>
          }
        />

          {/* The Add Patient Route */}
        <Route path="/add-patient"
          element={
            <RoleRoute allowedRoles={["admin", "reception"]}>
              <AddPatient />
            </RoleRoute>
          }
        />

        {/*The User Management Route */}
        <Route path="/users"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <Users />
            </RoleRoute>
          }
        />

        {/*The Lab Route */}
        <Route path="/lab"
          element={
            <RoleRoute allowedRoles={["admin", "doctor", "lab_technician"]}>
              <Lab />
            </RoleRoute>
          }
        />

        {/* The missing page route */}
        <Route path="*" element = {<MissingPage />} />
      </Routes>
    </Router>
    
  )
}

export default App
