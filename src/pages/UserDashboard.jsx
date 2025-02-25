import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import process from "process";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [complaint, setComplaint] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const filteredContacts = response.data
          .filter((c) => c.contactNo !== null && c.contactName !== null)
          .map(({ id, contactName, contactNo }) => ({ id, contactName, contactNo }));
        setContacts(filteredContacts);
      }
    } catch (err) {
      setError("Failed to fetch contacts.");
    }
  };

  const handleDelete = async (contactId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/users/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setContacts(contacts.filter((contact) => contact.id !== contactId));
    } catch (err) {
      setError("Failed to delete contact.");
    }
  };

  const handleEmergencyComplaint = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const token = localStorage.getItem("token");

        try {
          await axios.post(
            `${API_BASE_URL}/api/users/register-complaint`,
            {
              latitude,
              longitude,
              message: complaint || "I am in urgency",
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          alert("Complaint registered successfully!");
        } catch (err) {
          setError("Failed to register complaint.");
        }
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-danger btn-lg" onClick={handleEmergencyComplaint}>
          🚨 Emergency Complaint 🚨
        </button>
      </div>

      <div className="mb-4">
        <textarea
          className="form-control"
          placeholder="Enter your complaint..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        ></textarea>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <h2>Your Contacts</h2>
        <button className="btn btn-primary" onClick={() => navigate("/manage-contacts")}>
          Manage Contacts
        </button>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="mt-4">
        {contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          <ul className="list-group">
            {contacts.map(({ id, contactName, contactNo }) => (
              <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{contactName}</strong> <br />
                  <span>{contactNo}</span>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
