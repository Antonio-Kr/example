import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenService } from './token.service';
import { Tokens } from '../helpers/entities/tokens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tokens])],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
