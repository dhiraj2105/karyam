import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const WorkerLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      //   console.log("Form data", formData);
      const response = await fetch(`/workers/login`, {
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
      console.log("Login successful", data);

      // saving worker's token and role in localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.userId);
      localStorage.setItem("role", "worker");

      // navigate to homepage after login
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error registering worker:", error.message);
      // Handle error, e.g., show an error message to the user
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <Navbar />

      <div className="container formContainer section" id="workerLoginForm">
        <form onSubmit={handleSubmit} className="authForm">
          <h2>Login</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="infoInput"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <br />
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
              to="/auth/workerRegister"
              style={{
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Don't have an account ? Register
            </Link>
          </div>
          <button className="button infoButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkerLoginForm;
