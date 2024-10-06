import { Body, Controller, Post } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() loginAuthDto: LoginAuthDto) {
        const {email, password} = loginAuthDto;
        return this.authService.login(email, password);
    }
}
