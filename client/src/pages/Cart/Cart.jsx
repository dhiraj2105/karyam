import React, { useState } from "react";

const Cart = ({ cart, removeFromCart, client }) => {
  //   console.log(cart);
  // console.log(client._id);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    duration: "",
    additionalDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/booking/newBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: client._id,
          workers: cart.map((worker) => worker._id),
          date: bookingDetails.date,
          time: bookingDetails.time,
          duration: bookingDetails.duration,
          additionalDetails: bookingDetails.additionalDetails,
        }),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      setBookingDetails({
        date: "",
        time: "",
        duration: "",
        additionalDetails: "",
      });
      alert("Booking Successful");
    } catch (error) {
      console.error("Error booking workers", error);
      alert("Booking failed, Try again");
    }
  };

  return (
    <div className="cart-page container section">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <ul>
          {cart.map((worker) => (
            <li key={worker._id}>
              <h2>{worker.user.name}</h2>
              <p>SKill : {worker.skills}</p>
              <p>Location : {worker.location}</p>
              <p>Experience : {worker.experience} years</p>
              <button
                className="button"
                onClick={() => removeFromCart(worker._id)}
              >
                Remove From Cart
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}

      {/* Booking form */}
      <div className="bookingForm">
        <h2>Book worker</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="date"
            value={bookingDetails.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={bookingDetails.time}
            onChange={handleChange}
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (hours/days)"
            value={bookingDetails.duration}
            onChange={handleChange}
          />
          <textarea
            name="additionalDetails"
            placeholder="Additional Details"
            value={bookingDetails.additionalDetails}
            onChange={handleChange}
          />
          <button type="submit" className="button">
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
