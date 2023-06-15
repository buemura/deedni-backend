import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findById(id: string) {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async create(data: CreateUserDto) {
    return this.usersRepository.create(data);
  }

  async update(id: string, data: UpdateUserDto) {
    const userExists = await this.usersRepository.findById(id);
    if (!userExists) {
      return null;
    }

    return this.usersRepository.update(id, data);
  }

  async remove(id: string) {
    const userExists = await this.usersRepository.findById(id);
    if (!userExists) {
      return null;
    }

    return this.usersRepository.remove(id);
  }
}
