import { Test, TestingModule } from '@nestjs/testing';
import { ServiceLogController } from './service-log.controller';
import { ServiceLogService } from './service-log.service';

describe('ServiceLogController', () => {
  let serviceLogController: ServiceLogController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceLogController],
      providers: [ServiceLogService],
    }).compile();

    serviceLogController = app.get<ServiceLogController>(ServiceLogController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceLogController.getHello()).toBe('Hello World!');
    });
  });
});
