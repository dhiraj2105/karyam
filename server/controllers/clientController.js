import ClientModel from "../models/client.js";

// fetch particular client from database
export const getClient = async (req, res) => {
  const id = req.params.id;
  try {
    const client = await ClientModel.findById(id);
    if (client) {
      const { password, ...otherDetials } = client._doc;
      res.status(200).json(otherDetials);
    } else {
      res.status(404).json({ message: "No worker found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// fetch all client
export const getAllClients = async (req, res) => {
  try {
    let clients = await ClientModel.find();
    // remove password field from each worker object
    clients = clients.map((client) => {
      const { password, ...others } = client._doc;
      return others;
    });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json(error);
  }
};
