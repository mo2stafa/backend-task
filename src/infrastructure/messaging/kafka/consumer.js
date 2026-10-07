const { Kafka, logLevel } = require('kafkajs');
const config = require('../../../config');

const kafka = new Kafka({
  clientId: 'backend-task-consumer',
  brokers: config.kafkaBrokers,
  logLevel: logLevel.ERROR,
});

const consumer = kafka.consumer({ groupId: 'post-consumer-group' });

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'post.created', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value?.toString();
      console.log('[kafka] event received', {     //log the received event
        topic,
        partition,
        offset: message.offset,
        value,
      });
    },
  });

  console.log('[kafka] consumer subscribed to post.created');
}

async function stopConsumer() {
  await consumer.disconnect();
}

module.exports = { startConsumer, stopConsumer };
