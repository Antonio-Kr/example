import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Users } from './users.entity';

@Entity({ name: 'Tokens' })
export class Tokens {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text', nullable: false })
  token: string;

  @ManyToOne((_) => Users, (user) => user.tokens, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Array<Tokens> | number;
}
