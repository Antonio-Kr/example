import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Users } from './users.entity';

@Entity({ name: 'Roles' })
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 50, nullable: false })
  name: string;

  @OneToMany((_) => Users, (user) => user.role)
  user: Array<Users>;
}
