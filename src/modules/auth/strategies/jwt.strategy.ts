import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Company } from '@entities/company.entity';
import { User } from '@entities/user.entity';
import { ROLES } from '@enums/roles';
import { CompaniesService } from '@modules/companies/services/companies.service';
import { UsersService } from '@modules/users/services/users.service';
import { TokenPayload } from '../types/token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  public async validate(payload: TokenPayload): Promise<any> {
    const { sub, role } = payload;

    let user: User | Company;

    switch (role) {
      case ROLES.USER:
        user = await this.usersService.findById(sub);
        break;
      case ROLES.COMPANY:
        user = await this.companiesService.findById(sub);
        break;
      default:
        this.logger.debug(`User|Company ${sub} not found`);
        throw new UnauthorizedException();
    }

    if (!user) {
      this.logger.debug(`User|Company ${sub} not found`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
