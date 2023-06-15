import { Injectable } from '@nestjs/common';
import { CreateJobDto } from '../dtos/create-job.dto';
import { JobsQueryOptionsDto } from '../dtos/job-query-options.dto';
import { UpdateJobDto } from '../dtos/update-job.dto';
import { JobsRepository } from '../repositories/jobs.repository';

@Injectable()
export class JobsService {
  constructor(private readonly jobsRepository: JobsRepository) {}

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
