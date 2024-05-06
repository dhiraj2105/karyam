import express from "express";
import { registerWorker, loginWorker } from "../controllers/authController.js";
import {
  deleteAllWorkers,
  getAllWorkers,
  getWorker,
  getWorkerBySkill,
  updateWorker,
} from "../controllers/workerController.js";

const router = express.Router();

router.post("/register", registerWorker);
router.post("/login", loginWorker);
router.get("/:id", getWorker);
// router.get("/", getAllWorkers);
router.get("/", getWorkerBySkill);
router.put("/update/:workerId", updateWorker);

// do not use again
// router.delete("/deleteAllWorkers", deleteAllWorkers);

export default router;
