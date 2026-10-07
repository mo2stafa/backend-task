const { Kafka, logLevel } = require('kafkajs');
const config = require('../../../config');

const kafka = new Kafka({
  clientId: 'backend-task',
  brokers: config.kafkaBrokers,
  logLevel: logLevel.ERROR,
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log('[kafka] producer connected');
}

async function disconnectProducer() {
  await producer.disconnect();
}

module.exports = { producer, connectProducer, disconnectProducer };
