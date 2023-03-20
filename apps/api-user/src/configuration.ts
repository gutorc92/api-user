export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  rabbitmqHost: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
  rabbitmqQueue: process.env.RABBITMQ_QUEUE,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432
  },
});
