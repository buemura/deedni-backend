import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const UserAuthorization = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const id = request.params.id;

    if (!user || user.id !== id) {
      throw new UnauthorizedException();
    }

    return user;
  },
);
