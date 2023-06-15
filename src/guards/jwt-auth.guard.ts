import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const id = request.params?.id;

    if (!user) {
      throw new UnauthorizedException();
    }

    if (id && id !== !user.id) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
