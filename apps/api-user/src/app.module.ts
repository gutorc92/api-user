import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@app/entity/domain/user/UserModule';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { LoggerMiddleware } from './logger.middleware';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('API_USER_DATABASE_HOST'),
        port: config.get<number>('API_USER_DATABASE_PORT'),
        username: config.get<string>('API_USER_DATABASE_USER'),
        password: config.get<string>('API_USER_DATABASE_PASSWORD'),
        database: config.get<string>('API_USER_DATABASE_DB'),
        logging: config.get<string>('API_USER_DATABASE_LOG') === 'true',
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'LOG_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('rabbitmqHost')],
            queue: configService.get<string>('rabbitmqQueue'),
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
