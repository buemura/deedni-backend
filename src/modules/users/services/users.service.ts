import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@modules/users/dtos/create-user.dto';
import { UpdateUserDto } from '@modules/users/dtos/update-user.dto';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.usersRepository.create(data);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const userExists = await this.findById(id);
    if (!userExists) {
      return null;
    }

    return this.usersRepository.update(id, data);
  }

  async remove(id: string): Promise<User> {
    const userExists = await this.findById(id);
    if (!userExists) {
      return null;
    }

    return this.usersRepository.remove(id);
  }
}
