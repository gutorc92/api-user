import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    default: 'Teste',
  })
  name: string;

  @ApiProperty({
    description: 'The last name of the user',
    default: 'Testando',
  })
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    default: 'teste@testando.com',
  })
  email: string;
}

export class UpdateUserDto {
  name?: string;
  lastName?: string;
  email?: string;
}
