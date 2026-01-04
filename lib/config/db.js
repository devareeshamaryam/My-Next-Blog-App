

 
// lib/mongoose.js or utils/mongoose.js

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env file');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn; // Return already connected instance
  }

  if (!cached.promise) {
    const opts = {
      dbName: 'next-blog-app', // Your database name
      bufferCommands: false,   // Disable mongoose buffering
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('DB Connected to:', mongoose.connection.db.databaseName);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset on error
    console.error('DB Connection Error:', error.message);
    throw error;
  }
}

export default connectDB;