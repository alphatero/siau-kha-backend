import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(user_account?: string, user_mima?: string): Promise<{
        id: any;
        user_name: any;
        user_account: any;
        user_role: any;
    }>;
}
export {};
