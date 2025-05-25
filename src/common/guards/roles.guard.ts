import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const mandatoryRole = this.reflector.get(Role, context.getHandler());

    if (!mandatoryRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return mandatoryRole === user.role;
  }
}
