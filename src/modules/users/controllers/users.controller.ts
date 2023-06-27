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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from '@modules/users/dtos/update-user.dto';
import { UserResponseDto } from '@modules/users/dtos/user-response.dto';
import { User } from '@modules/users/entities/user.entity';
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ type: [UserResponseDto] })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: UserResponseDto })
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiResponse({ type: UserResponseDto })
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
  @ApiResponse({ type: UserResponseDto })
  async remove(@CurrentUser() user: User, @Param('id') id: string) {
    if (user.id !== id) {
      throw new UnauthorizedException();
    }

    return this.usersService.remove(id);
  }
}
