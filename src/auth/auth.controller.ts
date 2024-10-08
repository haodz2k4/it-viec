import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, Res } from '@nestjs/common';
import { LoginReqDto } from './dto/login-req.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';
import { ResponseMessage } from 'src/decorator/transfrom-response.decorate';
import { LoginResDto } from './dto/login-res.dto';
import { RegisterReqDto } from './dto/register-req.dto';
import { CookieResponseInterceptor } from 'src/interceptors/cookie.interceptor';
import { Response } from 'express';
import refreshTokenDecorator from 'src/decorator/refresh-token.decorator';
import { RefreshResDto } from './dto/refresh-res.dto';
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @Public()
    @UseInterceptors(CookieResponseInterceptor)
    @ResponseMessage("Login")
    login(@Body() loginAuthDto: LoginReqDto): Promise<LoginResDto> {
        const {email, password} = loginAuthDto;
        return this.authService.login(email, password);
    }

    @Public()
    logout(@Res() res: Response){
        res.clearCookie("refresh_token");
        res.status(200).json({message: "Logout successfully"})
    }

    @Post('refresh-token')
    @UseInterceptors(CookieResponseInterceptor)
    refreshToken(@refreshTokenDecorator() refreshToken: string):Promise<RefreshResDto> {
        return this.authService.refreshToken(refreshToken)
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @Public()
    @ResponseMessage('Register')
    register(@Body() registerReqDto: RegisterReqDto) {
        return this.authService.register(registerReqDto)
    }
}
