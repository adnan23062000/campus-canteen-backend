import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/hashPassword.util';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && await comparePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}