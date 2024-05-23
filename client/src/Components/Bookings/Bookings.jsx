import React, { useEffect, useState } from "react";

const Bookings = ({ workerData }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const workerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchBookings = async () => {
      const endpoint = "/booking/getBooking";
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workers: workerId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch worker bookings");
        }

        const workerBookings = await response.json();
        setBookings(workerBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching worker bookings:", error);
        setError("Failed to fetch worker bookings");
        setLoading(false);
      }
    };
    fetchBookings();
  }, [workerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* <h2>Worker Bookings</h2> */}
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Duration: {booking.duration}</p>
              <p>Additional Details: {booking.additionalDetails}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found for this worker</p>
      )}
    </div>
  );
};

export default Bookings;
