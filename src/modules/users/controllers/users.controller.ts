import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from '@modules/users/dtos/update-user.dto';
import { UserResponseDto } from '@modules/users/dtos/user-response.dto';
import { User } from '@modules/users/entities/user.entity';
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { NotFoundResponseDto } from '@shared/dtos/not-found-response.dto';
import { ERROR_MESSAGE } from '../errors/message';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserResponseDto] })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return user;
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    if (user.id !== id) {
      throw new UnauthorizedException();
    }

    const result = await this.usersService.update(id, body);
    if (!result) {
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return result;
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async remove(@CurrentUser() user: User, @Param('id') id: string) {
    if (user.id !== id) {
      throw new UnauthorizedException();
    }

    const result = await this.usersService.remove(id);
    if (!result) {
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return result;
  }
}
