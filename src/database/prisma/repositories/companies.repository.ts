import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from 'src/companies/dtos/create-company.dto';
import { UpdateCompanyDto } from 'src/companies/dtos/update-company.dto';
import { Company } from 'src/companies/entities/company.entity';
import { CompaniesRepository } from 'src/companies/repositories/companies.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCompaniesRepository implements CompaniesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Company[]> {
    return this.prisma.company.findMany();
  }

  async findById(id: string): Promise<Company> {
    return this.prisma.company.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Company> {
    return this.prisma.company.findFirst({
      where: { email },
    });
  }

  async create(data: CreateCompanyDto): Promise<Company> {
    return this.prisma.company.create({
      data,
    });
  }

  async update(id: string, data: UpdateCompanyDto): Promise<Company> {
    return this.prisma.company.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Company> {
    return this.prisma.company.delete({
      where: { id },
    });
  }
}
