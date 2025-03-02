import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
const API_BASE_URL =import.meta.env.VITE_API_BASE_URL;

const PoliceDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Fetch complaints assigned to the logged-in police
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token"); // Get stored token
      const response = await axios.get(`${API_BASE_URL}/api/police/complaints`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in header
        },
      });

      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error.response?.data || error.message);
    }
  };

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_BASE_URL}/api/police/complaints/${id}/status?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh complaints after status update
      fetchComplaints();
      alert(`Complaint ${id} updated to ${status}`);
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
      alert("Failed to update status");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">🚔 Police Dashboard</h2>
      </div>

      <div className="card shadow-sm p-4">
        <h4 className="text-dark mb-3">📋 Assigned Complaints</h4>

        {complaints.length === 0 ? (
          <div className="alert alert-warning text-center">
            No complaints assigned yet.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Complaint</th>
                  <th>PhoneNumber</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>{complaint.id}</td>
                    <td>{complaint.message}</td>
                    <td>{complaint.user.phoneNumber}</td>

                    <td>
                      {complaint.address || `${complaint.latitude}, ${complaint.longitude}`}
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={complaint.status}
                        onChange={(e) => updateStatus(complaint.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped">Dropped</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => updateStatus(complaint.id, "Completed")}
                      >
                        ✅ Mark Completed
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoliceDashboard;
