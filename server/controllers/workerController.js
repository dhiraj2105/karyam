import WorkerModel from "../models/worker.js";

// fetch particular worker from database
export const getWorker = async (req, res) => {
  const id = req.params.id;
  try {
    const worker = await WorkerModel.findById(id);
    if (worker) {
      const { password, ...otherDetials } = worker._doc;
      res.status(200).json(otherDetials);
    } else {
      res.status(404).json({ message: "No worker found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// fetch all workers
export const getAllWorkers = async (req, res) => {
  try {
    let workers = await WorkerModel.find();
    // remove password field from each worker object
    workers = workers.map((worker) => {
      const { password, ...others } = worker._doc;
      return others;
    });
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json(error);
  }
};

// fetch worker by skill or search query
export const getWorkerBySkill = async (req, res) => {
  try {
    let query = {};

    // skill
    if (req.query.skills) {
      query.skills = req.query.skills;
    }
    // search query
    else if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    const workers = await WorkerModel.find(query);

    if (!workers) {
      return res
        .status(404)
        .json({ message: "No worker found based on given skill or query" });
    }

    res.json(workers);
  } catch (error) {
    console.error("Error fetching workers based on skill or query :", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Worker
export const updateWorker = async (req, res) => {
  const { workerId } = req.params;
  const updatedData = req.body;

  try {
    const updateWorker = await WorkerModel.findByIdAndUpdate(
      workerId,
      updatedData,
      { new: true }
    );

    if (!updateWorker) {
      res.status(404).json({ message: "Worker not found" });
    }
    res.json(updateWorker);
  } catch (error) {
    console.error("Error updating worker:", error);
    res.status(500).json({ error: "Failed to update worker" });
  }
};

// DELETE ALL WORKERS
export const deleteAllWorkers = async (req, res) => {
  try {
    await WorkerModel.deleteMany();
    res.status(200).json({ message: "Deleted all workers successfully!" });
  } catch (error) {
    console.error("Error deleting workers:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting workers." });
  }
};
