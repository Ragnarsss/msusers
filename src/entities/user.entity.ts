import { ROLES } from '@common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'string', length: 25, unique: true })
  name: string;

  @Column({ type: 'string' })
  email: string;

  @Column({ type: 'string' })
  password: string;
  role: ROLES = ROLES.USER;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
