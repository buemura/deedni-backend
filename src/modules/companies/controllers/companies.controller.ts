import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CompanyResponseDto } from '@modules/companies/dtos/company-response.dto';
import { UpdateCompanyDto } from '@modules/companies/dtos/update-company.dto';
import { NotFoundResponseDto } from '@shared/dtos/not-found-response.dto';
import { ERROR_MESSAGE } from '../errors/message';
import { CompaniesService } from '../services/companies.service';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOkResponse({ type: [CompanyResponseDto] })
  async findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CompanyResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async findById(@Param('id') id: string) {
    const company = await this.companiesService.findById(id);
    if (!company) {
      throw new NotFoundException(ERROR_MESSAGE.COMPANY_NOT_FOUND);
    }

    return company;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const company = await this.companiesService.update(id, updateCompanyDto);
    if (!company) {
      throw new NotFoundException(ERROR_MESSAGE.COMPANY_NOT_FOUND);
    }

    return company;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompanyResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async remove(@Param('id') id: string) {
    const company = await this.companiesService.remove(id);
    if (!company) {
      throw new NotFoundException(ERROR_MESSAGE.COMPANY_NOT_FOUND);
    }

    return company;
  }
}
