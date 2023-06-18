import { MinLength, MaxLength, IsEnum } from 'class-validator';
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
  public readonly user_account: string;

  @MinLength(USER_PASSWORD_MIN_LENGTH)
  @MaxLength(USER_PASSWORD_MAX_LENGTH)
  public readonly user_mima: string;

  @MinLength(USER_USERNAME_MIN_LENGTH)
  @MaxLength(USER_USERNAME_MAX_LENGTH)
  public readonly user_name: string;

  @IsEnum(Role)
  public readonly user_role: Role;
}
