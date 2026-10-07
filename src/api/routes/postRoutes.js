const { Router } = require('express');

function buildPostRoutes(postController) {
  const router = Router();

  router.post('/', postController.create);
  router.get('/', postController.list);
  router.get('/:id', postController.get);

  return router;
}

module.exports = { buildPostRoutes };