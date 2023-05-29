/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { BlackList, BlackListDocument } from 'src/core/models/black-list';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly BlackListModel;
    constructor(userService: UserService, jwtService: JwtService, BlackListModel: Model<BlackListDocument>);
    validateUser(user_account: string, user_mima: string): Promise<{
        user_state: boolean;
        state_message: string;
        user_info: any;
    }>;
    generateJwt(payload: Record<string, string>): {
        token: string;
        exp: number;
    };
    setJwtToBlacklist(token: string): Promise<void>;
    findTokenInBlackList(token: string): Promise<import("mongoose").Document<unknown, {}, BlackListDocument> & Omit<BlackList & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
