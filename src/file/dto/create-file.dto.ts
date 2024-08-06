import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsUrl } from "class-validator"

export class CreateFileDto {

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
