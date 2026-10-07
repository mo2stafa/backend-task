class PostController {
  constructor({ createPost, getPost, listPosts }) {
    this.createPost = createPost;
    this.getPost = getPost;
    this.listPosts = listPosts;

    // bind so we can pass as callbacks
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.list = this.list.bind(this);
  }

  async create(req, res, next) {
    try {
      const { title, content } = req.body || {};
      if (!title || !content) {
        return res.status(400).json({ error: 'title and content are required' });
      }

      const post = await this.createPost.execute({ title, content });
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const post = await this.getPost.execute(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async list(_req, res, next) {
    try {
      const posts = await this.listPosts.execute();
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { PostController };