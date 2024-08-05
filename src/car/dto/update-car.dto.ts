import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
    @ApiProperty()
    @IsUUID()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    @IsUUID()
    modelId: string

    @ApiProperty()
    @IsString()
    @IsUUID()
    companyId: string

    @ApiProperty()
    @IsString()
    info: string
}
