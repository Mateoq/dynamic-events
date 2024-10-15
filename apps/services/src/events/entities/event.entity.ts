import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'integer', nullable: false, name: 'start_year' })
  startYear: number;

  @Column({ type: 'integer', nullable: false, name: 'start_month' })
  startMonth: number;

  @Column({ type: 'integer', nullable: false, name: 'start_date' })
  startDate: number;

  @Column({ type: 'integer', nullable: false, name: 'end_year' })
  endYear: number;

  @Column({ type: 'integer', nullable: false, name: 'end_month' })
  endMonth: number;

  @Column({ type: 'integer', nullable: false, name: 'end_date' })
  endDate: number;

  @Column({ type: 'integer', nullable: false, name: 'start_time' })
  time: number;

  @Column({ type: 'bool', nullable: true, default: false, name: 'full_day' })
  fullDay: boolean;

  @Column({ type: 'varchar', nullable: true })
  color: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
