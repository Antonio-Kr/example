import { Controller, Get, UseGuards, Request } from '@nestjs/common';

import { JwtAuthGuard } from '../helpers/guards/jwt-auth.guard';
import { Role } from './../helpers/decorators/role.decorator';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  /**
   * example of role based handlers with JWT Authorization
   */
  @Role('default')
  @UseGuards(JwtAuthGuard)
  @Get('default')
  async forUserRoute(@Request() req) {
    return { permision: 'user' };
  }

  /**
   * example of role based handlers with JWT Authorization
   */
  @Role('admin')
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async forAdminRoute(@Request() req) {
    return { permision: 'admin' };
  }
}
