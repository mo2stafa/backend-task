class EventPublisher {
  async publish(_topic, _message) {
    throw new Error('EventPublisher.publish not implemented');
  }
}

module.exports = { EventPublisher };
