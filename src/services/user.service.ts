import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '@dtos/user.dto';
import { User } from '@entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);
    return await this.userRepo.save(newUser).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.userRepo.merge(user, payload);
    return await this.userRepo.save(user).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async delete(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepo.delete({ id });
  }
}
