import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import SearchWorker from "../../Components/SearchWorker/SearchWorker";
import Bookings from "../../Components/Bookings/Bookings";

const Home = ({
  isAuthenticated,
  role,
  onLogout,
  userData,
  cart,
  addToCart,
}) => {
  return (
    <div className="section container" id="home">
      <Navbar
        isAuthenticated={isAuthenticated}
        role={role}
        onLogout={onLogout}
        userData={userData}
        cart={cart}
      />
      {role === "worker" ? (
        <>
          <h2>Your Bookings</h2>
          <Bookings workerData={userData} />
        </>
      ) : (
        <SearchWorker addToCart={addToCart} />
      )}
    </div>
  );
};

export default Home;
