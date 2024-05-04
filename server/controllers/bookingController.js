import BookingModel from "../models/booking.js";

export const CreateBooking = async (req, res) => {
  try {
    // Extract booking details from req
    const { clientId, workers, date, time, duration, additionalDetails } =
      req.body;

    const newBooking = new BookingModel({
      workers,
      client: clientId,
      date,
      time,
      duration,
      additionalDetails,
    });

    const savedBooking = await newBooking.save();

    // response
    res
      .status(201)
      .json({ message: "Booking successful", booking: savedBooking });
  } catch (error) {
    console.error("Error booking workers: ", error);
    res.status(500).json({ error: "Try again" });
  }
};

// fetch all bookings
export const getAllBookings = async (req, res) => {
  try {
    let bookings = await BookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

//fetch booking with worker's id
export const getWorkerBookings = async (req, res) => {
  try {
    const { workers } = req.body;
    const workerBookings = await BookingModel.find({ workers: workers });

    res.status(200).json(workerBookings);
  } catch (error) {
    console.error("Error fetching worker bookings:", error);
    res.status(500).json({ error: "Failed to fetch worker bookings." });
  }
};
