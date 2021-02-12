import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { roles } from './data';
import { Roles } from '../../helpers/entities/roles.entity';

@Injectable()
export class RolesSeederService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  create(): Array<Promise<Roles>> {
    return roles.map(async (role) => {
      return await this.rolesRepository
        .findOne({ name: role.name })
        .then(async (dbRole) => {
          if (dbRole) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.rolesRepository.insert(role));
        })
        .catch((err) => Promise.reject(err));
    });
  }
}
