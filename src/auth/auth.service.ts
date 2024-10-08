import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginResDto, TokenResDto } from './dto/login-res.dto';
import { ConfigService } from '@nestjs/config';
import { RegisterReqDto } from './dto/register-req.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async login(email: string, password: string): Promise<LoginResDto> {
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
            ...token,
            tokenExpires: this.configService.get<string>('JWT_ACCESS_EXPIRE')
        } 
    }
    
    
    async generateAuthToken(payload: any): Promise<TokenResDto> {
        return {
            access_token: await this.jwtService.signAsync(payload),
            refresh_token: await this.jwtService.signAsync(payload,{
                secret:  this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE') 
            })
        } 
    }
    
    async register(registerReqDto: RegisterReqDto){
        return await this.userService.create(registerReqDto);
    }
}
