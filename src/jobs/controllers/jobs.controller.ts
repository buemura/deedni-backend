import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ROLES } from 'src/common/enums/roles';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/company-role.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateJobDto } from '../dtos/create-job.dto';
import { JobsQueryOptionsDto } from '../dtos/job-query-options.dto';
import { UpdateJobDto } from '../dtos/update-job.dto';
import { JobsService } from '../services/jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findMany(@Query() query: JobsQueryOptionsDto) {
    return this.jobsService.findMany(query);
  }

  @Get(':jobId')
  async findOne(@Param('jobId') jobId: string) {
    return this.jobsService.findById(+jobId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  async create(@Body() data: CreateJobDto) {
    return this.jobsService.create(data);
  }

  @Patch(':jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  async update(
    @Param('jobId') jobId: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.jobsService.update(+jobId, updateJobDto);
  }

  @Delete(':jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  async remove(@Param('jobId') jobId: string) {
    return this.jobsService.remove(+jobId);
  }
}
