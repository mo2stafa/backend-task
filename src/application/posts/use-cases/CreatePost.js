const { randomUUID } = require('crypto');
const { Post } = require('../../../domain/posts/entities/Post');

class CreatePost {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ title, content }) {
    const post = new Post({
      id: randomUUID(),
      title,
      content,
      createdAt: new Date(),
    });

    return this.postRepository.save(post);
  }
}

module.exports = { CreatePost };