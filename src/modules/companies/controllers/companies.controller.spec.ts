import { CompaniesRepository } from '@modules/companies/repositories/companies.repository';
import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from '../services/companies.service';
import { CompaniesController } from './companies.controller';

const metadata: ModuleMetadata = {
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    { provide: CompaniesRepository, useValue: () => null },
  ],
};

describe('CompaniesController', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      metadata,
    ).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
