# backend-task

A Posts API built with DDD layering: REST + MongoDB + Kafka, all running via Docker Compose.

## Structure

```
src/
├── domain/          Post entity, PostRepository port
├── application/     use cases (CreatePost, GetPost, ListPosts),
│                    EventPublisher port, PostEventService
├── infrastructure/  MongoPostRepository, KafkaEventPublisher,
│                    producer, consumer
├── api/             PostController, routes, error handler
├── config/          env config
├── container.js     wires dependencies
├── app.js           express app
└── index.js         bootstrap (mongo + kafka + listen)
```

Dependencies point inward. Domain and application never import Express, mongoose, or kafkajs — only the infrastructure layer does. `container.js` is the only file that instantiates infrastructure classes.

## How to run

Requires Docker Desktop.

```bash
cp .env.example .env
docker compose up --build
```

API runs at `http://localhost:3000`.

Stop:

```bash
docker compose down
```

Reset the database:

```bash
docker compose down -v
```

## API

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| POST | `/posts` | Create a post (publishes `post.created` to Kafka) |
| GET | `/posts` | List all posts |
| GET | `/posts/:id` | Get one post |

Example:

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"World"}'
```

## Kafka flow

When a post is created, the app publishes a `post.created` event to Kafka. A consumer logs it.

Watch it happen:

```bash
docker compose logs api -f
# [kafka] event received { topic: 'post.created', ... }
```

The use case (`CreatePost`) depends on an `EventPublisher` port, not on Kafka. Kafka lives in infrastructure and implements the port. Swapping brokers means writing one new adapter — nothing else changes.

## Postman

Import both files from `postman/`:

- `backend-task.postman_collection.json`
- `backend-task.postman_environment.json`

Run the collection in order: Health check → Create post → List posts → Get post. `baseUrl` is `http://localhost:3000`.

## Deployment

The full stack runs on any Linux VM with Docker:

```bash
git clone <repo>
cd backend-task
cp .env.example .env
docker compose up -d --build
```

Not deployed publicly — the AWS account couldn't be provisioned due to a payment issue. The compose file has no host-specific values; every setting comes from environment variables, so the same `docker-compose.yml` runs unchanged on any server.