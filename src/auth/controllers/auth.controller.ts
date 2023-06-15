import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginCompanyDto } from 'src/companies/dtos/login-company.dto';
import { RegisterCompanyDto } from 'src/companies/dtos/register-company.dto';
import { Company } from 'src/companies/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/register')
  async registerUser(@Body() body: RegisterUserDto) {
    return this.authService.registerUser(body);
  }

  @Post('users/login')
  async loginUser(@Body() body: LoginUserDto) {
    return this.authService.loginUser(body);
  }

  @Post('companies/register')
  async registerCompany(@Body() body: RegisterCompanyDto) {
    return this.authService.registerCompany(body);
  }

  @Post('companies/login')
  async loginCompany(@Body() body: LoginCompanyDto) {
    return this.authService.loginCompany(body);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getCompanyProfile(@CurrentUser() user: User | Company) {
    return user;
  }
}
