import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsUUID } from "class-validator"

export class CreateCompanyDto {
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
