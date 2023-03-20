import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Log } from './Log.entity';
import { CreateLogDto } from './Log.dto.entity';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {
    this.logger.debug('ttl');
  }

  async findAll(
    offset: number,
    limit: number,
    order?: number,
  ): Promise<Array<Log>> {
    return this.logRepository.find({
      order: { time: order ? -1 : 1 },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Log> {
    return this.logRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async create(log: CreateLogDto): Promise<Log> {
    return this.logRepository.save(log);
  }

  async delete(id: number): Promise<Log> {
    const log = await this.findOne(id);
    return this.logRepository.save(log);
  }
}
