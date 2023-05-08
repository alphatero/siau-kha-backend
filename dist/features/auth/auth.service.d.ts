import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(user_account: string, user_mima: string): Promise<{
        user_state: boolean;
        state_message: string;
        user_info: any;
    }>;
    generateJwt(payload: Record<string, string>): {
        token: string;
    };
}
