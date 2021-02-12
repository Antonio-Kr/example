import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { RolesService } from '../roles/roles.service';
import { UsersService } from './../users/users.service';
import { TokenService } from './../token/token.service';
import { LoginUserDTO } from '../helpers/dtos/login-user.dto';
import { IUser } from './../helpers/interfaces/user.interface';
import { CreateUserDTO } from './../helpers/dtos/create-user.dto';
import { ITokenPayload } from './../helpers/interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async register(user: CreateUserDTO) {
    try {
      let createdUser = await this.usersService.insert(user);
      createdUser = await this.usersService.findOneById(createdUser.id);
      return this.login(createdUser);
    } catch (error) {
      switch (error.code) {
        /** handling duplicate sql error */
        case 'ER_DUP_ENTRY':
          throw new HttpException(
            'User with this email already exist',
            HttpStatus.CONFLICT,
          );

        default:
          throw new HttpException(
            'Cannot register current user, try again later',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  async validateUser(loginUser: LoginUserDTO) {
    const user = await this.usersService.findOne(loginUser.email);
    if (!user)
      throw new HttpException(
        'User with current email does not exist',
        HttpStatus.NOT_FOUND,
      );
    if (!bcrypt.compareSync(loginUser.password, user.password)) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: IUser) {
    const role = await this.rolesService.getById((user.role as any).id);
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
      role: role.name,
    };
    return await this.generateTokens(payload);
  }

  async validateRefreshToken(refresh_token_id: string) {
    try {
      const token = await this.tokenService.findOneAndDelete(refresh_token_id);

      const { sub, email, role }: ITokenPayload = this.jwtService.verify(
        token.token,
      );
      const payload: ITokenPayload = { sub, email, role };
      return this.generateTokens(payload);
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException();
    }
  }

  private async generateTokens(payload: ITokenPayload) {
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '40s' });
    const refresh_token_id = await this.tokenService.insert(
      refresh_token,
      payload.sub,
    );

    return { access_token, refresh_token_id };
  }
}
