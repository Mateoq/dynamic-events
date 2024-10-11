import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/entities/user.entity';
import { Event } from './events/entities/event.entity';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ENV_VARS } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(ENV_VARS.PG_HOST),
        port: +configService.get(ENV_VARS.PG_PORT),
        username: configService.get(ENV_VARS.PG_USER),
        password: configService.get(ENV_VARS.PG_PASSWORD),
        database: configService.get(ENV_VARS.PG_DB),
        entities: [User, Event],
        synchronize: false,
        extra: { ssl: true }
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
