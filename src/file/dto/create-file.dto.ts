import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsUrl } from "class-validator"

export class CreateFileDto {
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
