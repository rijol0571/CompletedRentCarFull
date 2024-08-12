import { ApiProperty } from "@nestjs/swagger"

import { IsString, IsUUID } from "class-validator"

export class CreateCarFindexDto {
    @ApiProperty()
    @IsUUID()
    carId: string

    @IsUUID()
    @ApiProperty()
    userId: string

    @ApiProperty()
    @IsString()
    score: string
}
