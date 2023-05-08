import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_url);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectMongo;
