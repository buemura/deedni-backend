import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { ROLES } from 'src/common/enums/roles';
import { LoginCompanyDto } from 'src/companies/dtos/login-company.dto';
import { RegisterCompanyDto } from 'src/companies/dtos/register-company.dto';
import { Company } from 'src/companies/entities/company.entity';
import { CompaniesService } from 'src/companies/services/companies.service';
import { UsersService } from 'src/users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
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

  async loginUser(data: LoginUserDto) {
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

  async loginCompany(data: LoginCompanyDto) {
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
