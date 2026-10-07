const express = require('express');
const cors = require('cors');

const { buildPostRoutes } = require('./api/routes/postRoutes');
const { errorHandler } = require('./api/middlewares/errorHandler');

function buildApp({ postController }) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.use('/posts', buildPostRoutes(postController));

  app.use(errorHandler);

  return app;
}

module.exports = { buildApp };