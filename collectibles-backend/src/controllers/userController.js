import UserModel from  '../schemas/user.js'


const createUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user and their collection
    const newUser = await UserModel.create({ userId, collectibles: { comics: [] } });

    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
};



export { createUser};
