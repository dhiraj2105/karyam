import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["worker"],
        // required: true,
      },
    },
    location: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      // required: true,
    },
    photos: {
      type: String,
    },
    availability: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;
