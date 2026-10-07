class ListPosts {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute() {
    return this.postRepository.findAll();
  }
}

module.exports = { ListPosts };