import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import process from "process";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const PoliceLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post(
        '${API_BASE_URL}/api/police/login',
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login Successful:", response.data);
      alert("Login Successful!");

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard
      navigate("/police/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Police Login</h2>
      <form onSubmit={handleLogin}>
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

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default PoliceLogin;
