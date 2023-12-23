import UserModel from "../schemas/user.js";
import CollectibleModel from "../schemas/collectible.js";

const getAllCollectiblesByType = async (req, res) => {
  try {
    const { userId } = req.body;
    const { collectibleType } = req.params;

    // Find the user by userId
    const user = await UserModel.findOne({ userId });
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve all collectibles of the specified type for the user
    const collectibles = await CollectibleModel.find({
      user: { $in: user._id },
      collectibleType: collectibleType,
    });

    res.json(collectibles);
  } catch (error) {
    console.error("Error retrieving collectibles:", error.message);
    res.status(500).json({ error: "Failed to retrieve collectibles" });
  }
};

const addCollectible = async (req, res) => {
  try {
    const {
      userId,
      collectibleType,
      collectibleName,
      issue,
      stock,
      price,
      info,
      img,
      platform,
      material,
    } = req.body;

    // Find the user by userId
    const user = await UserModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the collectibles array exists, if not, initialize it as an empty array
    if (!user.collectibles) {
      user.collectibles = [];
    }

    // Check if the collectible name already exists for the specified type
    const existingCollectible = await CollectibleModel.findOne({
      user: user._id,
      collectibleType,
      collectibleName,
    });

    if (existingCollectible) {
      return res
        .status(400)
        .json({ error: "Collectible with the same name already exists" });
    }

    // Create a new collectible document
    const newCollectible = await CollectibleModel.create({
      user: user._id,
      collectibleType,
      collectibleName,
      issue,
      stock,
      price,
      info,
      img,
      platform,
      material,
    });

    // Add the reference to the new collectible in the user's collectibles array
    user.collectibles.push(newCollectible._id);

    // Save the updated user document
    await user.save();

    res.json(newCollectible);
  } catch (error) {
    console.error("Error adding collectible:", error.message);
    res.status(500).json({ error: "Failed to add collectible" });
  }
};

const updateCollectibleById = async (req, res) => {
  try {
    const { userId } = req.body;
    const { collectibleId } = req.params;
    const { issue, stock, price, info, img, platform, material } = req.body;

    const user = await UserModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If user.collectibles is not present, initialize it as an empty array
    if (!user.collectibles) {
      user.collectibles = [];
    }

    if (!user.collectibles.includes(collectibleId)) {
      return res.status(404).json({ error: 'Collectible not found for the user' });
    }

    const collectible = await CollectibleModel.findById(collectibleId);

    if (!collectible) {
      return res.status(404).json({ error: 'Collectible not found' });
    }

    // Ensure the collectible belongs to the user
    if (String(collectible.user) !== String(user._id)) {
      return res.status(403).json({ error: 'Unauthorized to update this collectible' });
    }

    collectible.issue = issue;
    collectible.stock = stock;
    collectible.price = price;
    collectible.info = info;
    collectible.img = img;
    collectible.platform = platform;
    collectible.material = material;

    await collectible.save();

    res.json(collectible);
  } catch (error) {
    console.error('Error updating collectible:', error.message);
    res.status(500).json({ error: 'Failed to update collectible' });
  }
};

const deleteCollectibleById = async (req, res) => {
  try {
    const { userId } = req.body;
    const { collectibleId } = req.params;

    // Find the user by userId
    const user = await UserModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user.collectibles is not present, initialize it as an empty array
    if (!user.collectibles) {
      user.collectibles = [];
    }

    if (!user.collectibles.includes(collectibleId)) {
      return res
        .status(404)
        .json({ error: "Collectible not found for the user" });
    }
    // Remove the reference to the collectible in the user's collectibles array
    user.collectibles.pull(collectibleId);

    // Save the updated user document
    await user.save();

    // Delete the collectible document
    await CollectibleModel.findByIdAndDelete(collectibleId);

    res.json(user);
  } catch (error) {
    console.error("Error deleting collectible:", error.message);
    res.status(500).json({ error: "Failed to delete collectible" });
  }
};

export {
  addCollectible,
  deleteCollectibleById,
  getAllCollectiblesByType,
  updateCollectibleById,
};
