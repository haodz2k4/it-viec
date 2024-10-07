import { map } from 'rxjs/operators';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import ms from "ms";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CookieResponseInterceptor implements NestInterceptor {
    constructor(private configService: ConfigService) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe(
          map((data) => {
            const refreshToken = data.refresh_token;
    
            response.cookie('refresh_token', refreshToken, {
              httpOnly: true, 
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict', 
              maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
            });
    
            return {
              ...data,
              message: 'Refresh token has been set in cookie'
            };
          })
        );
    }
}
