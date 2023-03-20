import { NestFactory } from '@nestjs/core';
import { ApiLogModule } from './api-log.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiLogModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
