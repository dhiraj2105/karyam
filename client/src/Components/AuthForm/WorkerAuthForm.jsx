import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const WorkerAuthForm = () => {
  const navigate = useNavigate();
  // const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    skills: "",
    password: "",
    experience: "",
    rate: "",
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
      const response = await fetch(`/workers/register`, {
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
      // saving worker's token and role and name in localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "worker");
      localStorage.setItem("id", data.userId);

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
      <div className="container formContainer section">
        {/* <div className="workerForm"> */}
        <form className="authForm" onSubmit={handleSubmit}>
          <h2>SignUp</h2>
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
            <input
              type="text"
              placeholder="Skills"
              className="infoInput"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Experience  [Years]"
              className="infoInput"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Rate  [Per hour]"
              className="infoInput"
              name="rate"
              value={formData.rate}
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
              to="/auth/workerLoginForm"
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

export default WorkerAuthForm;
