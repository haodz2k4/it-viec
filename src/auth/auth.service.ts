import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { RegisterReqDto } from './dto/register-req.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}
    //Login 
    async login(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);
        if(!user || !user.isMatchPassword(password)){
            throw new UnauthorizedException("Invalid email or password");
        }
        const {id, role, fullName} = user 
        const payload = {sub: id, email, role, fullName}
        const token = await this.generateAuthToken(payload);
        //save refreshToken to user
        await this.userService.update(id, {refreshToken: token.refresh_token})
        return {
            _id: id,
            ...token
        } 
    }
    
    //refreshToken 
    async refreshToken(refreshToken: string){
        const {sub, email, role, fullName} = await this.verifyRefreshToken(refreshToken);
        const isValid = await this.isValidRefreshToken({sub, email, role, fullName}, refreshToken);
        if(!isValid){
            throw new UnauthorizedException("Invalid refresh token");
        }
        const token = await this.generateAuthToken({sub, email, role, fullName});
        return token

    }
    async verifyRefreshToken(refreshToken: string) {
        try {
            return await this.jwtService.verifyAsync(refreshToken,{
                secret: this.configService.get<string>('JWT_REFRESH_SECRET')
            })
        } catch {
            throw new UnauthorizedException("Invalid refresh token")
        }
    }
    private async isValidRefreshToken(payload: any, refreshToken: string):Promise<boolean> {
        const {sub} = payload;
        const user = await this.userService.findOneById(sub);
        return (user != null && user.refreshToken === refreshToken);
    }
    
    async generateAuthToken(payload: any) {
        return {
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: await this.jwtService.signAsync(payload,{
                secret:  this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE') 
            }),
            tokenExpires: this.configService.get<string>('JWT_ACCESS_EXPIRE')
        } 
    }
    
    async register(registerReqDto: RegisterReqDto){
        return await this.userService.create(registerReqDto);
    }
}
