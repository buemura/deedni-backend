import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';

import { LoginResponseDto } from '@dtos/auth/login-response.dto';
import { LoginUserDto } from '@dtos/auth/login-user.dto';
import { RegisterUserDto } from '@dtos/auth/register-user.dto';
import { LoginCompanyDto } from '@dtos/companies/login-company.dto';
import { RegisterCompanyDto } from '@dtos/companies/register-company.dto';
import { Company } from '@entities/company.entity';
import { User } from '@entities/user.entity';
import { ROLES } from '@enums/roles';
import { CompaniesService } from '@modules/companies/services/companies.service';
import { UsersService } from '@modules/users/services/users.service';
import { TokenPayload } from '../types/token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
  ) {}

  private generateToken(sub: string, role: ROLES) {
    const tokenPayload: TokenPayload = {
      sub,
      role,
    };

    const accessToken = this.jwtService.sign(tokenPayload);
    return {
      id: sub,
      accessToken,
    };
  }

  async loginUser(data: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = compareSync(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.generateToken(user.id, ROLES.USER);
  }

  async registerUser(data: RegisterUserDto): Promise<User> {
    const userExists = await this.usersService.findByEmail(data.email);
    if (userExists) {
      throw new BadRequestException('Email already taken');
    }

    const user = await this.usersService.create({
      ...data,
      password: hashSync(data.password, 10),
    });

    return user;
  }

  async loginCompany(data: LoginCompanyDto): Promise<LoginResponseDto> {
    const company = await this.companiesService.findByEmail(data.email);
    if (!company) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = compareSync(data.password, company.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.generateToken(company.id, ROLES.COMPANY);
  }

  async registerCompany(data: RegisterCompanyDto): Promise<Company> {
    const companyExists = await this.companiesService.findByEmail(data.email);
    if (companyExists) {
      throw new BadRequestException('Email already taken');
    }

    const company = await this.companiesService.create({
      ...data,
      password: hashSync(data.password, 10),
    });

    return company;
  }
}
