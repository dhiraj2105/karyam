import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, role, onLogout, userData, cart }) => {
  const Navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    Navigate("/");
  };
  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          Karyam
        </Link>

        <div className={"nav__menu"}>
          <ul className="nav__list grid">
            {isAuthenticated ? (
              <li className="nav__item">
                {role === "worker" ? (
                  <Link to="/workerProfile">
                    {userData ? userData.user.name : "Worker profile"}
                  </Link>
                ) : (
                  <>
                    <Link to="/clientProfile" className="button">
                      {userData ? userData.user.name : "Client profile"}
                    </Link>
                    <Link to="/cart" className="button">
                      <i className="uil uil-shopping-cart-alt"></i>{" "}
                      {cart.length}
                    </Link>
                  </>
                )}
                <button onClick={handleLogout} className="button">
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav__item">
                <Link to="/auth" className="nav__link button">
                  <i className="uil uil-user nav__icon"></i> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
