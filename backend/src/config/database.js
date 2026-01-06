import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MONGODB_URI:', MONGODB_URI);

export async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', MONGODB_URI);
    

    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

   
    const host = conn.connection.host;
    const name = conn.connection.name;
    console.log('MongoDB connected');
    console.log(`Host: ${host}`);
    console.log(`Database: ${name}`);

    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}
