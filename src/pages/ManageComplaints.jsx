import { useEffect, useState } from "react";
import axios from "axios";
import process from "process";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admins/complaints`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setComplaints(response.data);
    } catch (err) {
      setError("Failed to fetch complaints.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Complaints</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="col-md-12 mb-3">
            <div className="card p-3 shadow">
              <h5><strong>User:</strong> {complaint.user.name} ({complaint.user.phoneNumber})</h5>
              <p><strong>Address:</strong> {complaint.address || "Not provided"}</p>
              <p><strong>Message:</strong> {complaint.message}</p>
              <hr />
              <h6><strong>Police Station:</strong> {complaint.police.name}</h6>
              <p><strong>Police Address:</strong> {complaint.police.address}</p>
              <p><strong>Status:</strong> <span className="badge bg-warning">{complaint.status}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageComplaints;
