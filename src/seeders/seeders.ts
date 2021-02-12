import { UsersSeederService } from './users/users.service';
import { Injectable, Logger } from '@nestjs/common';

import { RolesSeederService } from './roles/roles.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly rolesSeederService: RolesSeederService,
    private readonly usersSeederService: UsersSeederService,
  ) {}

  async seed() {
    await Promise.all([this.roles(), this.users()])
      .then((completed) => {
        this.logger.debug('ROLES: successfully completed seeding...');
        this.logger.debug('USERS: successfully completed seeding...');
        Promise.resolve(completed);
      })
      .catch((err) => {
        this.logger.error('Seeding failed...');
        Promise.reject(err);
      });
  }

  private async roles() {
    return await Promise.all(this.rolesSeederService.create())
      .then(() => {
        return Promise.resolve(true);
      })
      .catch((err) => Promise.reject(err));
  }

  private async users() {
    return await Promise.all(this.usersSeederService.create())
      .then(() => {
        return Promise.resolve(true);
      })
      .catch((err) => Promise.reject(err));
  }
}
