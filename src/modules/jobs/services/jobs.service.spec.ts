import { JobsRepository } from '@modules/jobs/repositories/jobs.repository';
import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';

const metadata: ModuleMetadata = {
  providers: [JobsService, { provide: JobsRepository, useValue: () => null }],
};

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      metadata,
    ).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
