import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsIn } from 'class-validator';

export class QueryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  filter?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @ApiProperty()
  @IsOptional()
  @IsString()
  page?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  limit?: string;
}
