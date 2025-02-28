import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import process from "process";

const API_BASE_URL =import.meta.env.VITE_API_BASE_URL;

const AddPolice = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/admins/autocomplete?query=${query}`
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle selection of location
  const handleSelectLocation = (location) => {
    setQuery(location.formatted);
    setSelectedLocation({ lat: location.lat, lon: location.lon });
    setSuggestions([]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLocation) {
      alert("Please select a valid location from the dropdown.");
      return;
    }

    const policeData = {
      name,
      email,
      password,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lon,
    };

    console.log("Sending Data to Server:", policeData);

    // Retrieve token from localStorage (assuming login stores it)
    const token = localStorage.getItem("adminToken"); 

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admins/police/register",
        policeData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include token in header
          },
        }
      );

      console.log("Server Response:", response.data);
      alert("Police station added successfully!");
      navigate("/admin/manage-police");
    } catch (error) {
      console.error("Error adding police station:", error.response?.data || error.message);
      alert(`Failed to add police station: ${error.response?.data?.message || "Unknown error"}`);
    }
};

  return (
    <div className="container mt-4">
      <h2>Add Police Station</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Police Station Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Search Location</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            placeholder="Type location..."
            required
          />
          {suggestions.length > 0 && (
            <ul className="list-group mt-2">
              {suggestions.map((place) => (
                <li
                  key={place.place_id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectLocation(place)}
                  style={{ cursor: "pointer" }}
                >
                  {place.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Add Police Station
        </button>
      </form>
    </div>
  );
};

export default AddPolice;
