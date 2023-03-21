import { NestFactory } from '@nestjs/core';
import { ServiceLogModule } from './service-log.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app1 = await NestFactory.create(ServiceLogModule);
  const configService = app1.get(ConfigService);
  const url = `amqp://${configService.get<string>(
    'RABBITMQ_USER',
  )}:${configService.get<string>(
    'RABBITMQ_PASSWORD',
  )}@${configService.get<string>('RABBITMQ_HOST')}:${configService.get<string>(
    'RABBITMQ_PORT',
  )}`;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServiceLogModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue: configService.get<string>('RABBITMQ_QUEUE'),
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
