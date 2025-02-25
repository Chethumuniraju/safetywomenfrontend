import { useNavigate } from "react-router-dom";
import process from "process";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4">Admin Dashboard</h1>
      <button className="btn btn-primary btn-lg w-75 mb-3" onClick={() => navigate("/admin/manage-complaints")}>
        📜 Manage Complaints
      </button>
      <button className="btn btn-secondary btn-lg w-75" onClick={() => navigate("/admin/manage-police")}>
        🚔 Manage Police Stations
      </button>
    </div>
  );
};

export default AdminDashboard;
