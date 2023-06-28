import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseDto {
  @ApiProperty({ default: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ default: 'Not found' })
  error: string;
}
