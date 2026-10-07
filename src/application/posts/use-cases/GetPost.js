class GetPost {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute(id) {
    return this.postRepository.findById(id);
  }
}

module.exports = { GetPost };