import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Users } from '../helpers/entities/users.entity';
import { CreateUserDTO } from '../helpers/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async insert(user: CreateUserDTO) {
    const newUser = this.usersRepository.create(user);
    const res = await this.usersRepository.insert(newUser);
    return await this.usersRepository.findOne(res.identifiers[0].id);
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne(
      { email },
      { relations: ['role'] },
    );
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOne({ id }, { relations: ['role'] });
  }
}
