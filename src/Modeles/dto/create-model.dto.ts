import { ApiProperty } from "@nestjs/swagger"

import { IsString, IsUUID } from "class-validator"

export class CreateModelDto {
    @IsString()
    @ApiProperty()
    name: string

    @IsString()
    @IsUUID()
    companyId: string
}
