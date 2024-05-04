import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Client from "../models/client.js";
import Worker from "../models/worker.js";

// Client Registration
export const registerClient = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    const existingClient = await Client.findOne({ "user.email": email });
    if (existingClient) {
      return res.status(400).json({ message: "Client already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = new Client({
      user: {
        name,
        email,
        password: hashedPassword,
        role: "client",
      },
      location,
    });

    await client.save();

    const token = jwt.sign(
      { userId: client._id, role: "client" },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(201).json({ client, token, userId: client._id });
  } catch (error) {
    console.error("Error registering client:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Client login
export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ "user.email": email });
    if (!client) {
      return res.status(400).json({ message: "Client not found." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      client.user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { userId: client._id, role: "client" },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({ token, userId: client._id });
  } catch (error) {
    console.error("Error logging in client:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Worker registration
export const registerWorker = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      skills,
      rate,
      location,
      experience,
      photos,
      availability,
    } = req.body;

    const existingWorker = await Worker.findOne({ "user.email": email });
    if (existingWorker) {
      return res.status(400).json({ message: "Worker already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = new Worker({
      user: {
        name,
        email,
        password: hashedPassword,
        role: "worker",
      },
      skills,
      rate,
      location,
      experience,
      photos,
      availability,
    });

    await worker.save();

    const token = jwt.sign(
      { userId: worker._id, role: "worker" },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(201).json({ worker, token, userId: worker._id });
  } catch (error) {
    console.error("Error registering worker:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Worker login
export const loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ "user.email": email });
    if (!worker) {
      return res.status(400).json({ message: "Worker not found." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      worker.user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { userId: worker._id, role: "worker" },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({ token, userId: worker._id });
  } catch (error) {
    console.error("Error logging in worker:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
