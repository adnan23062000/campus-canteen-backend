import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/hashPassword.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Email does not exist'); 
    }

    const isPasswordValid = await comparePassword(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password'); 
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}