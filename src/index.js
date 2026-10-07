const config = require('./config');
const { connectMongo } = require('./infrastructure/database/mongo');
const { connectProducer } = require('./infrastructure/messaging/kafka/producer');
const { startConsumer } = require('./infrastructure/messaging/kafka/consumer');
const { buildContainer } = require('./container');
const { buildApp } = require('./app');

async function bootstrap() {
  console.log('[bootstrap] connecting to mongo...');
  await connectMongo();

  console.log('[bootstrap] connecting kafka producer...');
  await connectProducer();

  console.log('[bootstrap] starting kafka consumer...');
  await startConsumer();


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