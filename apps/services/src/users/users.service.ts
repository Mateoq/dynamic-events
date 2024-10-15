import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { TransactionResultType } from '../types';
import { newTransactionResult } from '../helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.usersRepo.exists({
      where: { email: createUserDto.email }
    });

    if (emailExists) {
      return newTransactionResult(
        null,
        TransactionResultType.EMAIL_USED,
        false
      );
    }

    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;

    try {
      const result = await this.usersRepo.save(user);

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

  findAll(data: QueryUserDto = {}) {
    const { id, email, name } = data;
    return this.usersRepo.find({
      where: { id, email, name },
      relations: { events: true }
    });
  }

  findOne(id: string) {
    return this.usersRepo.findOne({
      where: { id },
      relations: { events: true }
    });
  }

  findBy(data: QueryUserDto = {}) {
    const { id, email, name } = data;
    return this.usersRepo.findOne({
      where: { id, email, name },
      relations: { events: true }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepo.update({ id }, { ...updateUserDto });

      const result = this.usersRepo.findOne({
        where: { id },
        relations: { events: true }
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
      const user = await this.usersRepo.findOneBy({ id });

      if (!user) {
        return newTransactionResult(
          null,
          TransactionResultType.WRONG_ID,
          false
        );
      }

      const result = await this.usersRepo.remove(user);

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
