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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesGuard } from '@modules/auth/guards/company-role.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreateJobDto } from '@modules/jobs/dtos/create-job.dto';
import { JobsQueryOptionsDto } from '@modules/jobs/dtos/job-query-options.dto';
import { JobResponseDto } from '@modules/jobs/dtos/job-response.dto';
import { UpdateJobDto } from '@modules/jobs/dtos/update-job.dto';
import { Roles } from '@shared/decorators/roles.decorator';
import { ROLES } from '@shared/enums/roles';
import { JobsService } from '../services/jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  @ApiResponse({ type: [JobResponseDto] })
  async findMany(@Query() query: JobsQueryOptionsDto) {
    return this.jobsService.findMany(query);
  }

  @Get(':jobId')
  @ApiResponse({ type: JobResponseDto })
  async findOne(@Param('jobId') jobId: string) {
    return this.jobsService.findById(+jobId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  async create(@Body() data: CreateJobDto) {
    return this.jobsService.create(data);
  }

  @Patch(':jobId')
  @ApiBearerAuth()
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  async update(
    @Param('jobId') jobId: string,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    return this.jobsService.update(+jobId, updateJobDto);
  }

  @Delete(':jobId')
  @ApiBearerAuth()
  @ApiResponse({ type: JobResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.COMPANY)
  async remove(@Param('jobId') jobId: string) {
    return this.jobsService.remove(+jobId);
  }
}
