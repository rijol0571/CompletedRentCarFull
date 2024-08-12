import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { CreateModelDto } from './create-model.dto';
import { IsString, IsUUID } from 'class-validator';


export class UpdateModelDto extends PartialType(CreateModelDto) {
    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @IsUUID()
    companyId: string
}
