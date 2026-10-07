const config = require('./config');
const { connectMongo } = require('./infrastructure/database/mongo');
const { buildContainer } = require('./container');
const { buildApp } = require('./app');

async function bootstrap() {
  await connectMongo();

  const container = buildContainer();
  const app = buildApp(container);

  app.listen(config.port, () => {
    console.log(`api listening on http://localhost:${config.port}`);
  });
}

bootstrap().catch((err) => {
  console.error('bootstrap failed', err);
  process.exit(1);
});