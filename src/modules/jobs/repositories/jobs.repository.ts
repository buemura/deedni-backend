import { CreateJobDto } from '@modules/jobs/dtos/create-job.dto';
import { JobsQueryOptionsDto } from '@modules/jobs/dtos/job-query-options.dto';
import { UpdateJobDto } from '@modules/jobs/dtos/update-job.dto';
import { Job } from '@modules/jobs/entities/job.entity';

export abstract class JobsRepository {
  abstract findMany(options?: JobsQueryOptionsDto): Promise<Job[]>;
  abstract findById(id: number): Promise<Job>;
  abstract create(data: CreateJobDto): Promise<Job>;
  abstract update(id: number, data: UpdateJobDto): Promise<Job>;
  abstract remove(id: number): Promise<Job>;
}
