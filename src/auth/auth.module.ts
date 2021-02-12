import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from 'src/roles/roles.module';
import { TokenModule } from 'src/token/token.module';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from '../helpers/strategies/jwt.strategy';
import { LocalStrategy } from '../helpers/strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: { expiresIn: '20s' },
        };
      },
      inject: [ConfigService],
    }),
    RolesModule,
    UsersModule,
    PassportModule,
    TokenModule,
  ],
  providers: [AuthService, LocalStrategy, ConfigService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
