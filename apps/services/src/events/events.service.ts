import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from './entities/event.entity';
import { User } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventDto } from './dto/query-event.dto';
import { TransactionResultType } from '../types';
import { newTransactionResult } from '../helpers';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(Event)
    private eventsRepo: Repository<Event>
  ) {}

  async create(createEventDto: CreateEventDto) {
    const user = await this.usersRepo.findOneBy({ id: createEventDto.userId });

    if (!user) {
      return newTransactionResult(
        null,
        TransactionResultType.WRONG_USER,
        false
      );
    }

    const event = new Event();
    event.title = createEventDto.title;
    event.description = createEventDto.description;
    event.city = createEventDto.city;
    event.startYear = createEventDto.startYear;
    event.startMonth = createEventDto.startMonth;
    event.startDate = createEventDto.startDate;
    event.endYear = createEventDto.endYear;
    event.endMonth = createEventDto.endMonth;
    event.endDate = createEventDto.endDate;
    event.startTime = createEventDto.startTime;
    event.endTime = createEventDto.endTime;
    event.fullDay = createEventDto.fullDay ?? true;
    event.color = createEventDto.color;
    event.user = user;

    try {
      const result = await this.eventsRepo.save(event);

      if (result) {
        return newTransactionResult(
          result,
          TransactionResultType.SUCCESS,
          true
        );
      }
    } catch (e) {
      return newTransactionResult(null, TransactionResultType.ERROR, false, {
        message: (e as Error).message
      });
    }

    return newTransactionResult(
      null,
      TransactionResultType.UNKNOWN_ERROR,
      false
    );
  }

  findAll(data: QueryEventDto = {}) {
    return this.eventsRepo.find({
      where: { ...data }
    });
  }

  findOne(id: string) {
    return this.eventsRepo.findOne({
      where: { id }
    });
  }

  findBy(data: QueryEventDto = {}) {
    return this.eventsRepo.findOne({
      where: { ...data }
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      await this.eventsRepo.update({ id }, { ...updateEventDto });

      const result = this.eventsRepo.findOne({
        where: { id }
      });

      if (result) {
        return newTransactionResult(
          result,
          TransactionResultType.SUCCESS,
          true
        );
      }
    } catch (e) {
      return newTransactionResult(null, TransactionResultType.ERROR, false, {
        message: (e as Error).message
      });
    }
    return newTransactionResult(
      null,
      TransactionResultType.UNKNOWN_ERROR,
      false
    );
  }

  async remove(id: string) {
    try {
      const event = await this.eventsRepo.findOneBy({ id });

      if (!event) {
        return newTransactionResult(
          null,
          TransactionResultType.WRONG_ID,
          false
        );
      }

      const result = await this.eventsRepo.remove(event);

      if (result) {
        return newTransactionResult(null, TransactionResultType.SUCCESS, true);
      }
    } catch (e) {
      return newTransactionResult(null, TransactionResultType.ERROR, false, {
        message: (e as Error).message
      });
    }

    return newTransactionResult(
      null,
      TransactionResultType.UNKNOWN_ERROR,
      false
    );
  }
}
