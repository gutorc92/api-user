import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { CreateLogDto } from '@app/entity/domain/log/Log.dto.entity';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject('LOG_SERVICE') private readonly client: ClientProxy) {}

  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date();
    this.client.emit('log', new CreateLogDto(req.method, now, req.body));
    console.log(
      'Request...',
      req.body,
      req.method,
      req.path,
      `${now.toTimeString()}`,
    );
    next();
  }
}
