import React from "react";
import { useNavigate } from "react-router-dom";

const WorkerProfile = ({ worker, onLogout }) => {
  const Navigate = useNavigate();

  // navigate to update worker profile
  const goToUpdateWorker = () => {
    Navigate("/updateWorker");
  };

  //handle logout
  const handleLogout = () => {
    onLogout();
    Navigate("/");
  };
  return (
    <div className="container section">
      <h2>Worker Profile</h2>
      <div>
        <p>Name: {worker.user.name}</p>
        <p>Email: {worker.user.email}</p>
        <p>Location: {worker.location}</p>
        <p>Skills: {worker.skills}</p>
        <p>Experience: {worker.experience} Years</p>
        <p>Rate : {worker.rate} per hour</p>
      </div>

      <div>
        <button className="button" onClick={goToUpdateWorker}>
          Update profile
        </button>
      </div>

      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default WorkerProfile;
