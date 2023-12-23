import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: String,
  collectibles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collectible',
  }],
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;