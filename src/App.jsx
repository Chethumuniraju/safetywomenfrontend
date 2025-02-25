import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import PoliceLogin from "./pages/PoliceLogin";
import AdminLogin from "./pages/AdminLogin";
import SignupForm from "./pages/UserRegister";
import UserDashboard from "./pages/UserDashboard";
import ManageContacts from "./pages/ManageContacts";
import AdminDashboard from "./pages/AdminDashboard";
import ManageComplaints from "./pages/ManageComplaints";
import ManagePolice from "./pages/ManagePolice";
import AddPolice from "./pages/AddPolice";
import PoliceDashboard from "./pages/PoliceDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/police" element={<PoliceLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/signup/user" element={<SignupForm />} />
        <Route path="/users/dashboard" element={<UserDashboard />} />
        <Route path="/users/manage-contacts" element={<ManageContacts />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-complaints" element={<ManageComplaints />} />
        <Route path="/admin/manage-police" element={<ManagePolice />} />
        <Route path="/admin/add-police" element={<AddPolice />} />
        <Route path="/police/dashboard" element={<PoliceDashboard />} />
        {/* <Route path="/admin/manage-police" element={<ManagePoliceStations />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
