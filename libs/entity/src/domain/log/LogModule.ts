import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Log } from '@app/entity/domain/log/Log.entity';
import { LogService } from '@app/entity/domain/log//Log.service';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  exports: [LogService, TypeOrmModule],
  providers: [LogService],
  controllers: [],
})
export class LogModule {}
