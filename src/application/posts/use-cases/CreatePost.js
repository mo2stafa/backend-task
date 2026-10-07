const { randomUUID } = require('crypto');
const { Post } = require('../../../domain/posts/entities/Post');

class CreatePost {
  constructor(postRepository, postEventService) {
    this.postRepository = postRepository;
    this.postEventService = postEventService;
  }

  async execute({ title, content }) {
    const post = new Post({
      id: randomUUID(),
      title,
      content,
      createdAt: new Date(),
    });

    const saved = await this.postRepository.save(post);
    await this.postEventService.emitPostCreated(saved);

    return saved;

  }
}

module.exports = { CreatePost };
