import { ApiProperty } from '@nestjs/swagger';

export class JobApplicationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  jobId: number;

  @ApiProperty()
  createdAt: Date;
}
