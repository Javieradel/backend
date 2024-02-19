import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser({name, email=''}: Partial<Users>, pass: string): Promise<any> {
    const user = await this.usersService.search([{name},{email}]);
    // 404 NOT FOUND IS A SECURITY ISSUE
    if(!user) throw new HttpException('Error: datos incorrectos', HttpStatus.BAD_REQUEST)
    
    const isValid = await compare(pass, user.password)
    if(!isValid) throw new HttpException('Error: datos incorrectos', HttpStatus.BAD_REQUEST)
    const { password, ...result } = user;
    
    const payload = { name: user.name, sub: user.id, email:user.email };
    return {
      user: result,
      access_token: this.jwtService.sign(payload),
    };
  }
}