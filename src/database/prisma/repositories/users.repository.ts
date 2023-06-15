import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '@dtos/users/create-user.dto';
import { UpdateUserDto } from '@dtos/users/update-user.dto';
import { User } from '@entities/user.entity';
import { UsersRepository } from '@repositories/users.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
