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

  @Column({ type: 'varchar', nullable: false, name: 'start_year' })
  startYear: string;

  @Column({ type: 'varchar', nullable: false, name: 'start_month' })
  startMonth: string;

  @Column({ type: 'varchar', nullable: false, name: 'start_date' })
  startDate: string;

  @Column({ type: 'varchar', nullable: false, name: 'end_year' })
  endYear: string;

  @Column({ type: 'varchar', nullable: false, name: 'end_month' })
  endMonth: string;

  @Column({ type: 'varchar', nullable: false, name: 'end_date' })
  endDate: string;

  @Column({ type: 'varchar', nullable: true, name: 'start_time' })
  startTime?: string;

  @Column({ type: 'varchar', nullable: true, name: 'end_time' })
  endTime?: string;

  @Column({ type: 'bool', nullable: true, default: true, name: 'full_day' })
  fullDay: boolean;

  @Column({ type: 'varchar', nullable: true })
  color: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
