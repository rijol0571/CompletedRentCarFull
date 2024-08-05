import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsUrl, IsUUID } from "class-validator"
import { isFloat64Array } from "util/types"

export class CreateCarImageDto {
    @IsString()
    @IsUUID()
    @ApiProperty()
    carId: string

    @IsString()
    @IsUrl()
    @ApiProperty()
    url: string

    @IsString()
    @ApiProperty()
    mimetype: string

    @ApiProperty()
    size: string
}
