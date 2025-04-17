import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

// MongoDB connection string from environment variable
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquiz';

// Connection options
const connectOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s
  connectTimeoutMS: 10000, // Give up initial connection after 10s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

// Actually use the options

console.log('Connecting to MongoDB...');
try {
  mongoose.connect(mongoUri, connectOptions);
  console.log('MongoDB connection successful');
} catch (err) {
  console.error('MongoDB connection error:', err);
}

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
  console.log(`MongoDB connected: ${mongoUri.split('@')[1] || 'local connection'}`);
});

export default db;
