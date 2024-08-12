import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { CreateCompanyDto } from './create-company.dto';
import { IsString, IsUUID } from 'class-validator';


export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    @IsString()
    @ApiProperty()
    name:string

    @IsString()
    @ApiProperty()
    @IsUUID()
    ownerId:string

    @IsString()
    @ApiProperty()
    logo:string
}
