import { Test, TestingModule } from '@nestjs/testing';
import { ApiLogController } from './api-log.controller';
import { ApiLogService } from './api-log.service';

describe('ApiLogController', () => {
  let apiLogController: ApiLogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiLogController],
      providers: [ApiLogService],
    }).compile();

    apiLogController = app.get<ApiLogController>(ApiLogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiLogController.getHello()).toBe('Hello World!');
    });
  });
});
