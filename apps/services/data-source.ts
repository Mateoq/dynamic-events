import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

import { User } from './src/users/entities/user.entity';
import { Event } from './src/events/entities/event.entity';

const { PG_HOST, PG_USER, PG_DB, PG_PASSWORD, PG_PORT } = process.env;

export default new DataSource({
  type: 'postgres',
  host: PG_HOST,
  port: +PG_PORT!,
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DB,
  entities: [User, Event],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
  logging: true,
  extra: { ssl: true }
});
