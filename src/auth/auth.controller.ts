import { Body, Controller, Post } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';
import { ResponseMessage } from 'src/decorator/transfrom-response.decorate';
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @Public()
    @ResponseMessage("Login")
    login(@Body() loginAuthDto: LoginAuthDto) {
        const {email, password} = loginAuthDto;
        return this.authService.login(email, password);
    }
}
