import express from 'express';
// import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log MongoDB connection status
console.log('MongoDB connection status:', db.readyState);
// 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(routes);

// Add health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = db.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    mongodb: dbStatus,
    mongodb_uri: process.env.MONGODB_URI ? 'configured' : 'not configured'
  });
});

// Handle MongoDB connection error
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Start server when MongoDB is connected
db.once('open', () => {
  console.log('MongoDB connected successfully');
  app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
});

// Start server even if MongoDB connection fails (after 5 seconds)
setTimeout(() => {
  if (db.readyState !== 1) {
    console.warn('Warning: Starting server without MongoDB connection');
    app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT} (without MongoDB)`));
  }
}, 5000);
