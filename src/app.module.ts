import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
