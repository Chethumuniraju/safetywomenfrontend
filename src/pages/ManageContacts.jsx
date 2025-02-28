import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL =import.meta.env.VITE_API_BASE_URL;

const ManageContacts = () => {
  const [contactName, setContactName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleAddContact = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/contacts`,
        { contactName, contactNo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess("Contact added successfully!");
        setContactName("");
        setContactNo("");
      }
    } catch (err) {
      setError("Failed to add contact. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Contacts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleAddContact} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Contact Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter contact name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter phone number"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Contact
        </button>
      </form>

      <button className="btn btn-secondary mt-3" onClick={() => navigate("/users/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default ManageContacts;
