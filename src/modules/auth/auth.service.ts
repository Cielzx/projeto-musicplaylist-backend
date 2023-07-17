import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.UserService.findByEmail(userEmail);
    if (user) {
      const password = await compare(userPassword, user.password);
      if (password) {
        return { email: user.email };
      }
    }
    return null;
  }

  async login(email: string) {
    const user = await this.UserService.findByEmail(email);

    return {
      token: this.jwtService.sign({ email }, { subject: user.id }),
    };
  }
}
