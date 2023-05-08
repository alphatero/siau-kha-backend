import { Role } from 'src/core/models/user';
export declare class CreateUserDto {
    readonly user_account: string;
    readonly user_mima: string;
    readonly user_name: string;
    readonly user_role: Role;
}
