import { PartialType } from '@nestjs/mapped-types';
import { RegisterCompanyDto } from './register-company.dto';

export class UpdateCompanyDto extends PartialType(RegisterCompanyDto) {}
