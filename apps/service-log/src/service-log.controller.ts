import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateLogDto } from '@app/entity/domain/log/Log.dto.entity';
import { LogService } from '@app/entity/domain/log/Log.service';

@Controller()
export class ServiceLogController {
  constructor(private readonly logService: LogService) {}

  @EventPattern('log')
  async handleMessagePrinted(data: CreateLogDto) {
    console.log('event recebido', data.method);
    // const logDto = new CreateLogDto();
    // logDto.method = data.method as string;
    // logDto.body = data.body as string;
    // logDto.time = data.time as Date;
    this.logService.create(data);
  }
}
