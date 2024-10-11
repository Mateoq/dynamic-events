import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Event } from '../../events/entities/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @OneToMany(() => Event, (ev) => ev.user)
  events?: Event[];
}
