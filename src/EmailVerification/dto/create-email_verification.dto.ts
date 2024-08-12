import { ApiProperty } from "@nestjs/swagger"

import { IsString, IsUUID } from "class-validator"

export class CreateEmailVerificationDto {
    @ApiProperty()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsString()
    token: string
}
