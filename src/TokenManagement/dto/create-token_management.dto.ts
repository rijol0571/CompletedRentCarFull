import { ApiProperty } from "@nestjs/swagger"

import { IsString, IsUUID } from "class-validator"

export class CreateTokenManagementDto {
    @IsUUID()
    @ApiProperty()
    userId: string

    @IsString()
    @ApiProperty()
    token: string
}
