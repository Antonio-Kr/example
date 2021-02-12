import { Module, Logger } from '@nestjs/common';

import { Seeder } from './seeders';
import { RolesSeederModule } from './roles/roles.module';
import { UsersSeederModule } from './users/users.module';

@Module({
  imports: [RolesSeederModule, UsersSeederModule],
  providers: [Logger, Seeder],
})
export class SeedersModule {}
