import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import {IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileDto extends PartialType(CreateFileDto) {
    @IsString()
    @ApiProperty()
    @IsUrl()
    url: string

    @IsString()
    @ApiProperty()
    mimetype: string

    @IsString()
    @ApiProperty()
    size: string

    @IsString()
    @ApiProperty()
    carId: string
}
