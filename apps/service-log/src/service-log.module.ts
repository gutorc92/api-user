import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceLogController } from './service-log.controller';
import { LogModule } from '@app/entity/domain/log/LogModule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('API_LOG_DATABASE_HOST'),
        port: config.get<number>('API_LOG_DATABASE_PORT'),
        username: config.get<string>('API_LOG_DATABASE_USER'),
        password: config.get<string>('API_LOG_DATABASE_PASSWORD'),
        database: config.get<string>('API_LOG_DATABASE_DB'),
        logging: config.get<string>('API_LOG_DATABASE_LOG') === 'true',
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    LogModule,
  ],
  controllers: [ServiceLogController],
  providers: [],
})
export class ServiceLogModule {}
