import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './User.entity';
import { CreateUserDto, UpdateUserDto } from './User.dto.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.logger.debug('ttl');
  }

  async findAll(
    offset: number,
    limit: number,
    order?: number,
  ): Promise<Array<User>> {
    return this.userRepository.find({
      order: { createdAt: order ? -1 : 1 },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  makePassword(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async create(user: CreateUserDto): Promise<User> {
    const password = this.makePassword(8);
    const userWithPassword = { ...user, password, createdAt: new Date() };
    return this.userRepository.save(userWithPassword);
  }

  async edit(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    user.deleted = true;
    return this.userRepository.save(user);
  }
}
