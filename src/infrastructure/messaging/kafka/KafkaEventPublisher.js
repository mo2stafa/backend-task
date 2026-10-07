const { EventPublisher } = require('../../../application/posts/ports/EventPublisher');
const { producer } = require('./producer');

class KafkaEventPublisher extends EventPublisher {
  async publish(topic, message) {
    if (!producer.isConnected || !producer.isConnected()) {
      await producer.connect();
    }
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}

module.exports = { KafkaEventPublisher };