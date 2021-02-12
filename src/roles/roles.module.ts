import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/helpers/entities/roles.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
