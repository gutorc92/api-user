import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiLogService {
  getHello(): string {
    return 'Hello World!';
  }
}
