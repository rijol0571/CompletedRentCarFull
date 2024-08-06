import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import {IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileDto extends PartialType(CreateFileDto) {
    @IsString()
    @ApiProperty()
    filename: string

    @IsString()
    @ApiProperty()
    originalname: string

    @IsString()
    @ApiProperty()
    path: string

    @IsString()
    @ApiProperty()
    mimetype: string
}
