import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { users } from './data';
import { Users } from './../../helpers/entities/users.entity';
import { IUserSeeder } from './../../helpers/interfaces/user-seeder.interface';

@Injectable()
export class UsersSeederService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  create(): Array<Promise<Users>> {
    return users.map(async (user: IUserSeeder) => {
      return await this.usersRepository
        .findOne({ email: user.email })
        .then(async (dbUser) => {
          if (dbUser) {
            return Promise.resolve(null);
          }
          const newUser = this.usersRepository.create(user);
          return Promise.resolve(this.usersRepository.insert(newUser));
        })
        .catch((err) => Promise.reject(err));
    });
  }
}
