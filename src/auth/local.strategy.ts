import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        usernameField: 'email',
        passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try{
        const user = await this.authService.validateUser(email, password);
        return user;
    }
    catch(error){
        if (error instanceof NotFoundException) {
            throw new HttpException('Email does not exist', HttpStatus.NOT_FOUND);
        } else if (error instanceof UnauthorizedException) {
            throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
        }
        throw error; 
    }
  }
}