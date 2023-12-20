import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment constants from .env file
dotenv.config(); 


async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {dbName: 'CollectibleDB'});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with an error code
  }
}

export { connect };
