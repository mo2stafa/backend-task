const TOPIC = 'post.created';

class PostEventService {
  constructor(eventPublisher) {
    this.eventPublisher = eventPublisher;
  }

  async emitPostCreated(post) {
    await this.eventPublisher.publish(TOPIC, {
      type: TOPIC,
      version: 1,
      occurredAt: new Date().toISOString(),
      payload: {
        id: post.id,
        title: post.title,
        createdAt: post.createdAt,
      },
    });
  }
}

module.exports = { PostEventService };