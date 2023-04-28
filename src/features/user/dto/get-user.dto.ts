import { MinLength, MaxLength } from 'class-validator';
import {
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
} from 'src/core/models/user';

export class GetUserDto {
  @MinLength(USER_USERNAME_MIN_LENGTH)
  @MaxLength(USER_USERNAME_MAX_LENGTH)
  public readonly user_account: string;
}
