import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// * 建立一個Local守衛，用來驗證帳號密碼登入
@Injectable()
export class LocalGuard extends AuthGuard('local') {}
