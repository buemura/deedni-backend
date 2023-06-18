import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@decorators/current-user.decorator';
import { LoginResponseDto } from '@dtos/auth/login-response.dto';
import { LoginUserDto } from '@dtos/auth/login-user.dto';
import { RegisterUserDto } from '@dtos/auth/register-user.dto';
import { CompanyResponseDto } from '@dtos/companies/company-response.dto';
import { LoginCompanyDto } from '@dtos/companies/login-company.dto';
import { RegisterCompanyDto } from '@dtos/companies/register-company.dto';
import { UserResponseDto } from '@dtos/users/user-response.dto';
import { Company } from '@entities/company.entity';
import { User } from '@entities/user.entity';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
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
