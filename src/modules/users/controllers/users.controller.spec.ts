import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '@repositories/users.repository';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

const metadata: ModuleMetadata = {
  controllers: [UsersController],
  providers: [UsersService, { provide: UsersRepository, useValue: () => null }],
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      metadata,
    ).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
