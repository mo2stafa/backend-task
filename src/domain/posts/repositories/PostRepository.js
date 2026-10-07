class PostRepository {
  async save(_post) {
    throw new Error('PostRepository.save not implemented');
  }

  async findById(_id) {
    throw new Error('PostRepository.findById not implemented');
  }

  async findAll() {
    throw new Error('PostRepository.findAll not implemented');
  }
}

module.exports = { PostRepository };
