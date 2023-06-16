import { CompaniesService } from '@modules/companies/services/companies.service';
import { UsersService } from '@modules/users/services/users.service';
import { ModuleMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

const metadata: ModuleMetadata = {
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: JwtService, useValue: () => null },
    { provide: UsersService, useValue: () => null },
    { provide: CompaniesService, useValue: () => null },
  ],
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      metadata,
    ).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
