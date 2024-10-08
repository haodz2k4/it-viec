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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'login'})
    @ApiBody({type: LoginReqDto})
    @ApiResponse({type: LoginResDto})
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
    @ApiBearerAuth()
    @ApiOperation({summary: 'logout'})
    @UseInterceptors(CookieResponseInterceptor)
    @HttpCode(HttpStatus.OK)
    logout(@Res() res: Response){
        res.clearCookie("refresh_token");
        res.status(200).json({message: "Logout successfully"})
    }

    @Post('refresh-token')
    @Public()
    @ApiOperation({summary: 'refresh token'})
    @ApiResponse({type: RefreshResDto})
    @UseInterceptors(CookieResponseInterceptor)
    @HttpCode(HttpStatus.OK)
    refreshToken(@refreshTokenDecorator() refreshToken: string):Promise<RefreshResDto> {
        return this.authService.refreshToken(refreshToken)
    }

    @Post('register')
    @ApiOperation({summary: 'Register'})
    @ApiBody({type: RegisterReqDto})
    @HttpCode(HttpStatus.OK)
    @Public()
    @ApiOperation({summary: 'Register'})
    @ResponseMessage('Register')
    register(@Body() registerReqDto: RegisterReqDto) {
        return this.authService.register(registerReqDto)
    }
}
