import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// * 建立一個JWT守衛，用來驗證JWT
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
