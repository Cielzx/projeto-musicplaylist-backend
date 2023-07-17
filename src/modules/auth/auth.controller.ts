import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuth } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('login')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('')
  @UseGuards(LocalAuth)
  async login(@Body() user: LoginDto) {
    return this.authService.login(user.email);
  }
}
