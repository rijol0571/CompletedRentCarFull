import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { CreateFileDto } from './create-file.dto';
import {IsString, IsUrl, IsUUID } from 'class-validator';

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

    @IsString()
    @ApiProperty()
    userId: string
}
