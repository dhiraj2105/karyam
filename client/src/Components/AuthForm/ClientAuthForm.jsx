import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

import "./AuthForm.css";

const ClientAuthForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data", formData);
      const response = await fetch(`/clients/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful", data);
      // saving worker's token and role in localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "client");
      localStorage.setItem("id", data.userId);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error registering worker:", error.message);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Navbar />
      <div className="container formContainer section">
        {/* <div className="workerForm"> */}
        <form className="authForm" onSubmit={handleSubmit}>
          <h2>SignUp as a Client</h2>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="infoInput"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="infoInput"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Location"
              className="infoInput"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <Link
              to="/auth/clientLoginForm"
              style={{
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Already have an account ? Login
            </Link>
          </div>
          <button className="button infoButton" type="submit">
            Submit
          </button>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ClientAuthForm;
