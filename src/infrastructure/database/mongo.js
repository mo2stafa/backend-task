const mongoose = require('mongoose');
const config = require('../../config');

async function connectMongo() {
  await mongoose.connect(config.mongoUri);
  console.log('DB connected');
}

module.exports = { connectMongo };