import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { LogEvent } from './models/log.event';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject('LOG_SERVICE') private readonly client: ClientProxy) {}

  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date();
    this.client.emit('log', new LogEvent(req.method, now, req.body));
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
