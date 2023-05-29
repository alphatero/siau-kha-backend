import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { IUserPayload } from './models/payload.model';
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    signIn(payload: IUserPayload): Promise<IUserPayload & {
        token: string;
        exp: number;
    }>;
    checkTokenExp(request: any): Promise<{
        hasExpired: boolean;
        exp: any;
    }>;
    signOut(request: any): Promise<void>;
}
