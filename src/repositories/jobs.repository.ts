import { CreateJobDto } from '@dtos/jobs/create-job.dto';
import { JobsQueryOptionsDto } from '@dtos/jobs/job-query-options.dto';
import { UpdateJobDto } from '@dtos/jobs/update-job.dto';
import { Job } from '@entities/job.entity';

export abstract class JobsRepository {
  abstract findMany(options?: JobsQueryOptionsDto): Promise<Job[]>;
  abstract findById(id: number): Promise<Job>;
  abstract create(data: CreateJobDto): Promise<Job>;
  abstract update(id: number, data: UpdateJobDto): Promise<Job>;
  abstract remove(id: number): Promise<Job>;
}
