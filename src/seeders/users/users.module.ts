import { UsersSeederService } from './users.service';
import { Users } from './../../helpers/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersSeederService],
  exports: [UsersSeederService],
})
export class UsersSeederModule {}
