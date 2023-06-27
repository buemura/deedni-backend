import { CompaniesRepository } from '@modules/companies/repositories/companies.repository';
import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';

const metadata: ModuleMetadata = {
  providers: [
    CompaniesService,
    { provide: CompaniesRepository, useValue: () => null },
  ],
};

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      metadata,
    ).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
