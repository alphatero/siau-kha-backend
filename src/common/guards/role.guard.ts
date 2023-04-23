import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../modules/authorization';
import { IUserPayload } from 'src/features/auth';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly authorizationService: AuthorizationService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { method, path, user } = request;
    const { role } = user as IUserPayload;
    const action = this.authorizationService.mappingAction(method);

    // if (!user) throw new UnauthorizedException();

    return this.authorizationService.checkPermission(
      `role:${role}`,
      path,
      action,
    );
  }
}
