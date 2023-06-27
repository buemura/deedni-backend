import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CompanyResponseDto } from '@modules/companies/dtos/company-response.dto';
import { UpdateCompanyDto } from '@modules/companies/dtos/update-company.dto';
import { CompaniesService } from '../services/companies.service';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiResponse({ type: [CompanyResponseDto] })
  async findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: CompanyResponseDto })
  async findById(@Param('id') id: string) {
    return this.companiesService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: CompanyResponseDto })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ type: CompanyResponseDto })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}
