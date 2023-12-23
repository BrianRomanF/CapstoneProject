import mongoose from 'mongoose';

const collectibleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collectibleType: String,
  collectibleName: String,
  issue: String,
  stock: Number,
  price: Number,
  info: String,
  img: String,
  platform: String,
  material: String,
  // Add additional fields as needed
});

const CollectibleModel = mongoose.model('Collectible', collectibleSchema);

export default CollectibleModel;
