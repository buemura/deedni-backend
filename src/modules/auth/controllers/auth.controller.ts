import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginResponseDto } from '@modules/auth/dtos/login-response.dto';
import { LoginUserDto } from '@modules/auth/dtos/login-user.dto';
import { RegisterUserDto } from '@modules/auth/dtos/register-user.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CompanyResponseDto } from '@modules/companies/dtos/company-response.dto';
import { LoginCompanyDto } from '@modules/companies/dtos/login-company.dto';
import { RegisterCompanyDto } from '@modules/companies/dtos/register-company.dto';
import { Company } from '@modules/companies/entities/company.entity';
import { UserResponseDto } from '@modules/users/dtos/user-response.dto';
import { User } from '@modules/users/entities/user.entity';
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/register')
  @ApiResponse({ type: UserResponseDto })
  async registerUser(@Body() body: RegisterUserDto) {
    return this.authService.registerUser(body);
  }

  @Post('users/login')
  @ApiResponse({ type: LoginResponseDto })
  async loginUser(@Body() body: LoginUserDto) {
    return this.authService.loginUser(body);
  }

  @Post('companies/register')
  @ApiResponse({ type: CompanyResponseDto })
  async registerCompany(@Body() body: RegisterCompanyDto) {
    return this.authService.registerCompany(body);
  }

  @Post('companies/login')
  @ApiResponse({ type: LoginResponseDto })
  async loginCompany(@Body() body: LoginCompanyDto) {
    return this.authService.loginCompany(body);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: UserResponseDto })
  async getProfile(@CurrentUser() user: User | Company) {
    return user;
  }
}
