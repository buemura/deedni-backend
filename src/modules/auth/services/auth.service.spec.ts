import { CompaniesService } from '@modules/companies/services/companies.service';
import { UsersService } from '@modules/users/services/users.service';
import { ModuleMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

const metadata: ModuleMetadata = {
  providers: [
    AuthService,
    { provide: JwtService, useValue: () => null },
    { provide: UsersService, useValue: () => null },
    { provide: CompaniesService, useValue: () => null },
  ],
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      metadata,
    ).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
