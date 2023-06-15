import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { TokenPayload } from '../modules/auth/types/token-payload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true; // No roles defined, allow access
    }
    const request = context.switchToHttp().getRequest();
    const jwtToken = request.headers.authorization.replace('Bearer ', '');
    const decoded = this.jwtService.decode(jwtToken) as TokenPayload;
    const userRole = decoded.role as string;
    return requiredRoles.includes(userRole);
  }
}
