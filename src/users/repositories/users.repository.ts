import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract create(data: CreateUserDto): Promise<User>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract remove(id: string): Promise<User>;
}
