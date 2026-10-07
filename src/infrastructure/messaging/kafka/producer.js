const { Kafka, logLevel } = require('kafkajs');
const config = require('../../../config');

const kafka = new Kafka({
  clientId: 'backend-task',
  brokers: config.kafkaBrokers,
  logLevel: logLevel.ERROR,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();

async function connectProducer(retries = 10, delayMs = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await producer.connect();
      console.log('[kafka] producer connected');
      return;
    } catch (err) {
      console.log(`[kafka] producer connect attempt ${i}/${retries} failed: ${err.message}`);
      if (i === retries) throw err;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

async function disconnectProducer() {
  await producer.disconnect();
}

module.exports = { producer, connectProducer, disconnectProducer };