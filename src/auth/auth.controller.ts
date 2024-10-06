import { Body, Controller, Post } from '@nestjs/common';
import { LoginReqDto } from './dto/login-req.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';
import { ResponseMessage } from 'src/decorator/transfrom-response.decorate';
import { LoginResDto } from './dto/login-res.dto';
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @Public()
    @ResponseMessage("Login")
    login(@Body() loginAuthDto: LoginReqDto): Promise<LoginResDto> {
        const {email, password} = loginAuthDto;
        return this.authService.login(email, password);
    }
}
