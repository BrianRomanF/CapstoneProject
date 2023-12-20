import express from "express";
import {
  getAllCollectiblesByType,
  addCollectible,
  updateCollectibleById,
  deleteCollectibleById,
} from "../controllers/collectibleController.js";
import { authenticate } from "../firebase.js";

const collectibleRouter = express.Router();

collectibleRouter.use(authenticate);

// Get all collectibles by type endpoint
collectibleRouter.get(
  "/getAllCollectibles/:collectibleType",
  getAllCollectiblesByType
);

// Add Collectible endpoint
collectibleRouter.post("/addCollectible", addCollectible);

// Update Collectible by ID endpoint
collectibleRouter.put(
  "/updateCollectible/:collectibleType/:collectibleId",
  updateCollectibleById
);

// Delete Collectible by ID endpoint
collectibleRouter.delete(
  "/deleteCollectible/:collectibleType/:collectibleId",
  deleteCollectibleById
);

export default collectibleRouter;
