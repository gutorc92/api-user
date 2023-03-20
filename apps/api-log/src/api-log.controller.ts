import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { LogService } from '@app/entity/domain/log/Log.service';
import { Log } from '@app/entity/domain/log/Log.entity';
import { CreateLogDto } from '@app/entity/domain/log/Log.dto.entity';
import { Response } from '@app/response/response/response.interface';

@Controller('logs')
export class ApiLogController {
  constructor(private readonly logService: LogService) {}

  @Get('')
  async findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
    @Query('order', new DefaultValuePipe(0), ParseIntPipe) order: number,
  ): Promise<Response<Log>> {
    const logs = await this.logService.findAll(offset, limit, order);
    const total = await this.logService.countTotal();
    return { items: logs, total };
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Log> {
    return this.logService.findOne(id);
  }

  @Post('')
  async create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logService.create(createLogDto);
  }
}
