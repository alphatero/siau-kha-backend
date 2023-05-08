import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUserPayload } from '../models/payload.model';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: IUserPayload): Promise<IUserPayload>;
}
export {};
