import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesSeederService } from './roles.service';
import { Roles } from 'src/helpers/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesSeederService],
  exports: [RolesSeederService],
})
export class RolesSeederModule {}
