import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "src/decorator/public.decorator";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService, 
        private configSerive: ConfigService, 
        private reflector: Reflector
    ) {}
    async canActivate(context: ExecutionContext):  Promise<boolean>{

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        
        if(!token){
            throw new UnauthorizedException("Token is must provided");
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configSerive.get("JWT_ACCESS_SECRET")
            });
            req["user"] = payload;
            
        } catch{
            throw new UnauthorizedException("Invalid Token: ")
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    
}