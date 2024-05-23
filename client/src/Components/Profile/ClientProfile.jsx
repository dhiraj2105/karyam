import React from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

const ClientProfile = ({ client, onLogout }) => {
  // console.log(client);
  const Navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    Navigate("/");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {/* <Navbar /> */}
      <div className="container section">
        <h2>Hello Client</h2>
        <div>
          <p>Name: {client.user.name}</p>
          <p>Email: {client.user.email}</p>
          <p>Location: {client.location}</p>
        </div>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ClientProfile;
