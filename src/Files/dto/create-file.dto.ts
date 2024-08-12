import { ApiProperty } from "@nestjs/swagger"

import { IsString, IsUrl, IsUUID } from "class-validator"

export class CreateFileDto {

    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;

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
