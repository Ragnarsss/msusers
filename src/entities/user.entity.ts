import { ROLES } from '@common/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
