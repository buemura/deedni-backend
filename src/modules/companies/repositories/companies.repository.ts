import { CreateCompanyDto } from '@modules/companies/dtos/create-company.dto';
import { UpdateCompanyDto } from '@modules/companies/dtos/update-company.dto';
import { Company } from '@modules/companies/entities/company.entity';

export abstract class CompaniesRepository {
  abstract findAll(): Promise<Company[]>;
  abstract findById(id: string): Promise<Company>;
  abstract findByEmail(email: string): Promise<Company>;
  abstract create(data: CreateCompanyDto): Promise<Company>;
  abstract update(id: string, data: UpdateCompanyDto): Promise<Company>;
  abstract remove(id: string): Promise<Company>;
}
