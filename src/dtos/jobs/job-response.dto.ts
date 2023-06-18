import { ApiProperty } from '@nestjs/swagger';

export class JobResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
