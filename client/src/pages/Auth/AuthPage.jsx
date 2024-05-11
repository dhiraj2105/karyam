import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

import "./AuthPage.css";

const AuthPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === "client") {
      navigate("/auth/clientRegister");
    } else if (option === "worker") {
      navigate("/auth/workerRegister");
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Navbar />
      <div className="container AuthContainer">
        <button
          className="button "
          onClick={() => handleOptionSelect("client")}
        >
          Client
        </button>
        <button className="button" onClick={() => handleOptionSelect("worker")}>
          Worker
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
