import { Injectable } from '@nestjs/common';

import { RegisterCompanyDto } from '@modules/companies/dtos/register-company.dto';
import { UpdateCompanyDto } from '@modules/companies/dtos/update-company.dto';
import { Company } from '@modules/companies/entities/company.entity';
import { CompaniesRepository } from '@modules/companies/repositories/companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.findAll();
  }

  async findById(id: string): Promise<Company> {
    return this.companiesRepository.findById(id);
  }

  async findByEmail(email: string): Promise<Company> {
    return this.companiesRepository.findByEmail(email);
  }

  async create(data: RegisterCompanyDto): Promise<Company> {
    return this.companiesRepository.create(data);
  }

  async update(id: string, data: UpdateCompanyDto) {
    return this.companiesRepository.update(id, data);
  }

  async remove(id: string) {
    return this.companiesRepository.remove(id);
  }
}
