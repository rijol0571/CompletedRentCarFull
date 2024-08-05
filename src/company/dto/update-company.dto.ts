import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
