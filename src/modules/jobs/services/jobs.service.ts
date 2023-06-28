import { Injectable, Logger } from '@nestjs/common';

import { CreateJobDto } from '@modules/jobs/dtos/create-job.dto';
import { JobsQueryOptionsDto } from '@modules/jobs/dtos/job-query-options.dto';
import { UpdateJobDto } from '@modules/jobs/dtos/update-job.dto';
import { JobsRepository } from '@modules/jobs/repositories/jobs.repository';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobsService {
  private readonly logger: Logger;

  constructor(private readonly jobsRepository: JobsRepository) {
    this.logger = new Logger(JobsService.name);
  }

  async findMany(query: JobsQueryOptionsDto): Promise<Job[]> {
    return this.jobsRepository.findMany(query);
  }

  async findById(id: number): Promise<Job> {
    const job = await this.jobsRepository.findById(id);
    if (!job) {
      return null;
    }

    return job;
  }

  async create(data: CreateJobDto): Promise<Job> {
    return this.jobsRepository.create(data);
  }

  async update(id: number, data: UpdateJobDto): Promise<Job> {
    const job = await this.findById(id);
    if (!job) {
      return null;
    }

    return this.jobsRepository.update(id, data);
  }

  async remove(id: number): Promise<Job> {
    const job = await this.findById(id);
    if (!job) {
      return null;
    }

    return this.jobsRepository.remove(id);
  }
}
