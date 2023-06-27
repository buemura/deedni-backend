export class CreateCompanyDto {
  name: string;
  email: string;
  password: string;
  description?: string;
  profileUrl?: string;
}
