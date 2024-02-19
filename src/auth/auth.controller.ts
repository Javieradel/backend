import { Body, Controller, Post, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
        ) {}
    
    @Post('login')
    async login(@Body() {name, password, email=''}: LoginDTO): Promise<any> {
        return this.authService.validateUser({name, email}, password)

    };
}
