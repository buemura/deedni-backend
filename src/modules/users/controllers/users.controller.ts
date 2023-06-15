import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '@decorators/current-user.decorator';
import { UpdateUserDto } from '@dtos/users/update-user.dto';
import { User } from '@entities/user.entity';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    if (user.id !== id) {
      throw new UnauthorizedException();
    }

    return this.usersService.update(id, body);
  }

  @Delete(':id')
  async remove(@CurrentUser() user: User, @Param('id') id: string) {
    if (user.id !== id) {
      throw new UnauthorizedException();
    }

    return this.usersService.remove(id);
  }
}
