import { PartialType } from '@nestjs/mapped-types';
import { CreateModelDto } from './create-model.dto';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateModelDto extends PartialType(CreateModelDto) {
    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @IsUUID()
    companyId: string
}
