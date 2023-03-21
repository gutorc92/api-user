import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './app.controller';
import { UserService } from '@app/entity/domain/user/User.service';
import { User } from '@app/entity/domain/user/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const user1 = new User();
user1.name = 'Teste';
user1.id = 1;
user1.email = 'testando@teste.com';
user1.deleted = false;
user1.lastName = 'Testando';
user1.password = 'teste';
user1.createdAt = new Date();

describe('AppController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(user1),
          },
        },
      ],
    }).compile();

    appController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = await appController.findOne(1);
      expect(result).toBe(user1);
    });
  });
});
