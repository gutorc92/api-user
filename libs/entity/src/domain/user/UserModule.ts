import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from '@app/entity/domain/user/User.entity';
import { UserService } from '@app/entity/domain/user/User.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, TypeOrmModule],
  providers: [UserService],
  controllers: [],
})
export class UserModule {}
