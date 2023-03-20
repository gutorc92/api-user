import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { User } from './models/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggerMiddleware } from './logger.middleware';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOG_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:testando12@localhost:5672'],
          queue: 'user-messages',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
