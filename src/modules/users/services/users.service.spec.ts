import { UsersRepository } from '@modules/users/repositories/users.repository';
import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

const metadata: ModuleMetadata = {
  providers: [UsersService, { provide: UsersRepository, useValue: () => null }],
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      metadata,
    ).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
