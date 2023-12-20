import mongoose from 'mongoose';

const collectibleSchema = new mongoose.Schema({
  collectibleName: String,
  issue: String,
  stock: Number,
  price: Number,
  info: String,
  img: String,
  platform: String,
  material: String,
  // Add additional fields as needed
}, { _id: true }); // Enable default _id for each collectible

const userSchema = new mongoose.Schema({
  userId: String,
  collectibles: {
    comics: [collectibleSchema],
    games: [collectibleSchema],
    figures: [collectibleSchema],
    // Add additional fields for other types
  },
});


const UserModel = mongoose.model('User', userSchema);

export default UserModel;
