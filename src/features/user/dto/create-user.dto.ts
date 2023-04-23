import { MinLength, MaxLength, IsEmail, IsEnum } from 'class-validator';
import {
  Role,
  USER_PASSWORD_MIN_LENGTH,
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
} from 'src/core/models/user';

export class CreateUserDto {
  @MinLength(USER_USERNAME_MIN_LENGTH)
  @MaxLength(USER_USERNAME_MAX_LENGTH)
  public readonly username: string;

  @MinLength(USER_PASSWORD_MIN_LENGTH)
  @MaxLength(USER_PASSWORD_MAX_LENGTH)
  public readonly password: string;

  @IsEmail()
  public readonly email: string;

  @IsEnum(Role)
  public readonly role: Role;
}
