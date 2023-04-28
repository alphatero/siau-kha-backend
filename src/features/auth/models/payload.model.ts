import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/core/models/user';

export interface IUserPayload {
  id: string;
  user_name: string;
  user_account: string;
  role: Role;
}
