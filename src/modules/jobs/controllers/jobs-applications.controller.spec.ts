import { JobsRepository } from '@modules/jobs/repositories/jobs.repository';
import { ModuleMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from '../services/jobs.service';
import { JobsController } from './jobs.controller';

const metadata: ModuleMetadata = {
  controllers: [JobsController],
  providers: [
    JobsService,
    { provide: JobsRepository, useValue: () => null },
    { provide: JwtService, useValue: () => null },
  ],
};

describe('JobsController', () => {
  let controller: JobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      metadata,
    ).compile();

    controller = module.get<JobsController>(JobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
