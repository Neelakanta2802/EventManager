/* eslint-disable no-undef */
const mongoose = require('mongoose');

// Replace with your MongoDB Atlas URI if using the cloud database
const MONGO_URI = 'mongodb://Nani:22P11A0505@ac-eqqxstb-shard-00-00.li1ok4h.mongodb.net:27017,ac-eqqxstb-shard-00-01.li1ok4h.mongodb.net:27017,ac-eqqxstb-shard-00-02.li1ok4h.mongodb.net:27017/Event_db?ssl=true&replicaSet=atlas-rnmhif-shard-0&authSource=admin&appName=Cluster0 '; 

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected...');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); // Stop the app if connection fails
  }
};

module.exports = connectDB;
