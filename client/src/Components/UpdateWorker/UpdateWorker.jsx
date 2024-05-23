import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./updateWorker.css";
import Navbar from "../Navbar/Navbar";

const UpdateWorker = ({ workerId }) => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    skills: "",
    password: "",
    experience: "",
    rate: "",
  });

  useEffect(() => {
    const fetchWorkerForm = async () => {
      const id = workerId._id;
      try {
        const response = await fetch(`/workers/${id}`);
        if (!response.ok) {
          throw new Error("failed to fetch worker data");
        }

        const workerData = await response.json();

        //update form data with exsisting worker data
        setFormData({
          name: workerData.user.name,
          email: workerData.user.email,
          location: workerData.location,
          skills: workerData.skills,
          experience: workerData.experience,
          rate: workerData.rate,
        });
      } catch (error) {
        console.error("Error fetching worker data:", error);
        setError("Failed to fetch worker data");
      }
    };
    fetchWorkerForm();
  }, [workerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`workers/update/${workerId._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (!response.ok) {
        throw new Error("Failed to update worker data");
      }
      setSuccess(true);
    } catch (error) {
      console.error("Error updating worker data:", error);
      setError("Failed to update worker data");
    }
    setLoading(false);

    // navigate back to worker profile after update
    Navigate("/workerProfile");
  };

  return (
    <>
      <Navbar />
      <div className="container section update-worker-form">
        <h2>Update Profile</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {success && <p>Worker data updated successfully</p>}
        {!loading && !error && !success && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formdata.location}
                onChange={handleChange}
                placeholder="Location"
              />
            </div>
            <div>
              <label>Skill:</label>
              <input
                type="text"
                name="skills"
                value={formdata.skills}
                onChange={handleChange}
                placeholder="Skill"
              />
            </div>
            <div>
              <label>Experience:</label>
              <input
                type="text"
                name="experience"
                value={formdata.experience}
                onChange={handleChange}
                placeholder="Experience"
              />
            </div>
            <div>
              <label>Rate:</label>
              <input
                type="text"
                name="rate"
                value={formdata.rate}
                onChange={handleChange}
                placeholder="Rate [per hour]"
              />
            </div>
            <button className="button" type="submit">
              Update Worker
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default UpdateWorker;
