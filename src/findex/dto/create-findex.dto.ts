import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsUUID } from "class-validator"

export class CreateFindexDto {
    @IsUUID()
    @ApiProperty()
    userId: string

    @IsString()
    @ApiProperty()
    score: string
}
