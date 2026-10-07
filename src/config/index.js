require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/backend-task',
  kafkaBrokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  nodeEnv: process.env.NODE_ENV || 'development',
};
