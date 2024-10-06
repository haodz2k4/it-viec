import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {}
    async login(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);
        if(!user || !user.isMatchPassword(password)){
            throw new UnauthorizedException("Invalid email or password");
        }
        return user 
    }
}
