import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Roles } from './roles.entity';
import { Tokens } from './tokens.entity';

@Entity({ name: 'Users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @ManyToOne((_) => Roles, (role) => role.user, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Array<Roles> | number;

  @OneToMany((_) => Tokens, (token) => token.user, { nullable: false })
  tokens: Array<Tokens>;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
