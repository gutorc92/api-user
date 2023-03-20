import { NestFactory } from '@nestjs/core';
import { ServiceLogModule } from './service-log.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServiceLogModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:testando12@localhost:5672'],
        queue: 'log-messages',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
