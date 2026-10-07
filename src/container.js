const { MongoPostRepository } = require('./infrastructure/database/repositories/MongoPostRepository');
const { KafkaEventPublisher } = require('./infrastructure/messaging/kafka/KafkaEventPublisher');

const { CreatePost } = require('./application/posts/use-cases/CreatePost');
const { GetPost } = require('./application/posts/use-cases/GetPost');
const { ListPosts } = require('./application/posts/use-cases/ListPosts');
const { PostEventService } = require('./application/posts/services/PostEventService');

const { PostController } = require('./api/controllers/PostController');

function buildContainer() {
  const postRepository = new MongoPostRepository();

  const eventPublisher = new KafkaEventPublisher();
  const postEventService = new PostEventService(eventPublisher);

  const createPost = new CreatePost(postRepository, postEventService);
  const getPost = new GetPost(postRepository);
  const listPosts = new ListPosts(postRepository);

  const postController = new PostController({ createPost, getPost, listPosts });

  return { postController };
}

module.exports = { buildContainer };