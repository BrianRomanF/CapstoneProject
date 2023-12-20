import UserModel from  '../schemas/user.js'


const getAllCollectiblesByType = async (req, res) => {
  try {
    const { userId } = req.body;
    const { collectibleType } = req.params;

    console.log("user , collect param", userId, collectibleType)
    // Find the user by userId
    const user = await UserModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve all collectibles of the specified type
    const collectibles = user.collectibles[collectibleType] || [];

    res.json(collectibles);
  } catch (error) {
    console.error('Error retrieving collectibles:', error.message);
    res.status(500).json({ error: 'Failed to retrieve collectibles' });
  }
};


const addCollectible = async (req, res) => {
    try {
      const { userId, collectibleType, collectibleName, issue, stock, price, info, img, platform, material } = req.body;
      console.log("body", req.body)
  
      // Find the user by userId
      const user = await UserModel.findOne({ userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
   // Check if the collectible name already exists for the specified type
   const existingCollectible = user.collectibles[collectibleType]?.find(
    (collectible) => collectible.collectibleName === collectibleName
  );
  
  if (existingCollectible) {
    return res.status(400).json({ error: 'Collectible name already exists' });
  } else {
  
  // Add the collectible to the specified array in collectibles object
  if (user.collectibles[collectibleType]) {
    user.collectibles[collectibleType].push({
      collectibleName,
      issue: collectibleType === 'comics' ? issue : undefined,
      stock,
      price: collectibleType === 'comics' ? price : undefined,
      info: collectibleType === 'comics' ? info : undefined,
      img: collectibleType === 'comics' ? img : undefined,
      platform: collectibleType === 'games' ? platform : undefined,
      material: collectibleType === 'figures' ? material : undefined,
    });
  } else {
    user.collectibles[collectibleType] = [{
      collectibleName,
      issue: collectibleType === 'comics' ? issue : undefined,
      stock,
      price: collectibleType === 'comics' ? price : undefined,
      info: collectibleType === 'comics' ? info : undefined,
      img: collectibleType === 'comics' ? img : undefined,
      platform: collectibleType === 'games' ? platform : undefined,
      material: collectibleType === 'figures' ? material : undefined,
    }];
  }
  }
  // Save the updated user document
  await user.save();
  
  res.json(user);
  } catch (error) {
  console.error('Error adding collectible:', error.message);
  res.status(500).json({ error: 'Failed to add collectible' });
  }
  };


  const updateCollectibleById = async (req, res) => {
    try {
      const { collectibleType, collectibleId } = req.params;
      const { userId, issue, stock, price, info, img, platform, material } = req.body;
  
      // Find the user by userId
      const user = await UserModel.findOne({ userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the collectible with the specified ID in the array
      const collectible = user.collectibles[collectibleType]?.find(
        (c) => c._id.toString() === collectibleId
      );
  
      if (!collectible) {
        return res.status(404).json({ error: 'Collectible not found' });
      }
  
      // Update collectible fields
      collectible.issue = collectibleType === 'comics' ? issue : collectible.issue;
      collectible.stock = stock;
      collectible.price = collectibleType === 'comics' ? price : collectible.price;
      collectible.info = collectibleType === 'comics' ? info : collectible.info;
      collectible.img = collectibleType === 'comics' ? img : collectible.img;
      collectible.platform = collectibleType === 'games' ? platform : collectible.platform;
      collectible.material = collectibleType === 'figures' ? material : collectible.material;
  
      // Save the updated user document
      await user.save();
  
      res.json(user);
    } catch (error) {
      console.error('Error updating collectible:', error.message);
      res.status(500).json({ error: 'Failed to update collectible' });
    }
  };


  
  const deleteCollectibleById = async (req, res) => {
    try {
      const { collectibleType, collectibleId} = req.params;
      const { userId} = req.body;
  
  
      // Find the user by userId
      const user = await UserModel.findOne({ userId });
      console.log("user",user)
  
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the index of the collectible with the specified ID in the array
      const collectibleIndex = user.collectibles[collectibleType]?.findIndex(
        (collectible) => collectible._id.toString() === collectibleId
      );
      console.log("collectibleIndex", )
  
      if (collectibleIndex === -1) {
        return res.status(404).json({ error: 'Collectible not found' });
      }
  
      // Remove the collectible from the array
      user.collectibles[collectibleType].splice(collectibleIndex, 1);
  
      // Save the updated user document
      await user.save();
  
      res.json(user);
    } catch (error) {
      console.error('Error deleting collectible:', error.message);
      res.status(500).json({ error: 'Failed to delete collectible' });
    }
  };
  
  export {  addCollectible, deleteCollectibleById, getAllCollectiblesByType, updateCollectibleById };