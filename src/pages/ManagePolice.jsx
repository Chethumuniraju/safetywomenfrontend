import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const API_BASE_URL =import.meta.env.VITE_API_BASE_URL;

const ManagePolice = () => {
  const [policeStations, setPoliceStations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/admins/police`)
      .then((response) => {
        setPoliceStations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching police stations:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Manage Police Stations</h2>
        <button className="btn btn-primary" onClick={() => navigate("/admin/add-police")}>
          ➕ Add Police Station
        </button>
      </div>

      <div className="row mt-3">
        {policeStations.length === 0 ? (
          <p className="text-center">No police stations found.</p>
        ) : (
          policeStations.map((station) => (
            <div key={station.id} className="col-md-6">
              <div className="card p-3 mb-3 shadow">
                <h4>{station.name}</h4>
                <p>
                  <strong>📍 Address:</strong> {station.address}
                </p>
                <p>
                  <strong>📧 Email:</strong> {station.email ? station.email : "N/A"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManagePolice;
