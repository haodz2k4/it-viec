import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export default createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const refresh_token = request.cookies.refresh_token;
    return refresh_token
  },
);