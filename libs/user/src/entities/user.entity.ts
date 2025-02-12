import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '../types/user.types';
// import { Role } from '../enums/role.enum';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 100 })
  // role: Role;
  role: string; // Лучшим решением было бы ограничить список допустимых значений !!!!!!

  @Column({ type: 'int' })
  efficiency: number;
}
