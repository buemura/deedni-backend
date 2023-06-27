import { Injectable, Logger } from '@nestjs/common';

import { CreateJobDto } from '@modules/jobs/dtos/create-job.dto';
import { JobsQueryOptionsDto } from '@modules/jobs/dtos/job-query-options.dto';
import { UpdateJobDto } from '@modules/jobs/dtos/update-job.dto';
import { JobsRepository } from '@modules/jobs/repositories/jobs.repository';

@Injectable()
export class JobsService {
  private readonly logger: Logger;

  constructor(private readonly jobsRepository: JobsRepository) {
    this.logger = new Logger(JobsService.name);
  }

  async findMany(query: JobsQueryOptionsDto) {
    return this.jobsRepository.findMany(query);
  }

  async findById(id: number) {
    return this.jobsRepository.findById(id);
  }

  async create(data: CreateJobDto) {
    return this.jobsRepository.create(data);
  }

  async update(id: number, data: UpdateJobDto) {
    return this.jobsRepository.update(id, data);
  }

  async remove(id: number) {
    return this.jobsRepository.remove(id);
  }
}
