import {
    HttpException,
    Injectable,
    HttpStatus,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  
  import { Tokens } from './../helpers/entities/tokens.entity';
  
  @Injectable()
  export class TokenService {
    constructor(
      @InjectRepository(Tokens)
      private readonly tokenRepository: Repository<Tokens>,
    ) {}
  
    async insert(token: string, user: number): Promise<string> {
      const newToken = this.tokenRepository.create({ token, user });
      
      const insertResult = await this.tokenRepository.insert(newToken);
      return insertResult.identifiers[0].id;
    }
  
    async findOneAndDelete(id: string): Promise<Tokens> {
      const token = await this.tokenRepository.findOne(id);
      if (!token) {
        throw new HttpException('Refresh token not found', HttpStatus.NOT_FOUND);
      }
      await this.tokenRepository.delete({ id: token.id });
      return token;
    }
  }
  