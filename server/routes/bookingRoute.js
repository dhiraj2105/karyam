import express from "express";
import {
  CreateBooking,
  getAllBookings,
  getWorkerBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/newBooking", CreateBooking);
router.get("/", getAllBookings);
router.post(`/getBooking`, getWorkerBookings);

export default router;
