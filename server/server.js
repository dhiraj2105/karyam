import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import clientRoute from "./routes/clientRoute.js";
import workerRoute from "./routes/workerRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://rk9675174525:AbimlkzVG92BkVyg@cluster0.fhmnqba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successfully connecting to MongoDB
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define routes
app.use("/clients", clientRoute);
app.use("/workers", workerRoute);
app.use("/booking", bookingRoute);
