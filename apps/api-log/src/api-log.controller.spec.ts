import { Test, TestingModule } from '@nestjs/testing';
import { ApiLogController } from './api-log.controller';
import { LogModule } from '@app/entity/domain/log/LogModule';
import { ConfigModule } from '@nestjs/config';

describe('ApiLogController', () => {
  let apiLogController: ApiLogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), LogModule],
      controllers: [ApiLogController],
      providers: [],
    }).compile();

    apiLogController = app.get<ApiLogController>(ApiLogController);
  });

  describe('root', () => {
    it('should return one log', () => {
      expect(apiLogController.findOne(1)).toBe('Hello World!');
    });
  });
});
