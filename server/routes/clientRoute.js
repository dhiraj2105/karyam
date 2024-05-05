import express from "express";
import { registerClient, loginClient } from "../controllers/authController.js";
import { getAllClients, getClient } from "../controllers/clientController.js";

const router = express.Router();

router.post("/register", registerClient);
router.post("/login", loginClient);
router.get("/:id", getClient);
router.get("/", getAllClients);

export default router;
