import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/helpers/dtos/create-user.dto';
import { LocalAuthGuard } from '../helpers/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() user: CreateUserDTO) {
    return this.authService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/refresh')
  async refresh(@Body("refresh_token_id") refresh_token_id) {
    return this.authService.validateRefreshToken(refresh_token_id);
  }
}
