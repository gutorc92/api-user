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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@app/entity/domain/user/User.dto.entity';
import { User } from '@app/entity/domain/user/User.entity';
import { UserService } from '@app/entity/domain/user/User.service';
import { Response } from '@app/response/response/response.interface';
import { UpdateResult } from 'typeorm';

@ApiTags('users')
@Controller('users')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('')
  async findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
  ): Promise<Response<User>> {
    const users = await this.userService.findAll(offset, limit);
    const total = await this.userService.countTotal();
    return { items: users, total };
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: number): Promise<User> {
    return this.userService.delete(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Created' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put('/:id')
  async edit(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userService.edit(id, updateUserDto);
  }
}
