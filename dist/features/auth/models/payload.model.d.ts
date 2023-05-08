import { Role } from 'src/core/models/user';
export interface IUserPayload {
    id: string;
    user_name: string;
    user_account: string;
    user_role: Role;
}
