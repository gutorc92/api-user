export class CreateUserDto {
  name: string;
  lastName: string;
  email: string;
}

export class UpdateUserDto {
  name?: string;
  lastName?: string;
  email?: string;
}
