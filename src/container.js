const { MongoPostRepository } = require('./infrastructure/database/repositories/MongoPostRepository');

const { CreatePost } = require('./application/posts/use-cases/CreatePost');
const { GetPost } = require('./application/posts/use-cases/GetPost');
const { ListPosts } = require('./application/posts/use-cases/ListPosts');

const { PostController } = require('./api/controllers/PostController');

function buildContainer() {
  const postRepository = new MongoPostRepository();

  const createPost = new CreatePost(postRepository);
  const getPost = new GetPost(postRepository);
  const listPosts = new ListPosts(postRepository);

  const postController = new PostController({ createPost, getPost, listPosts });

  return { postController };
}

module.exports = { buildContainer };