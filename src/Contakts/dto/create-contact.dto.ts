import { ApiProperty } from "@nestjs/swagger"

import { IsEmail, IsPhoneNumber, IsString, IsUUID } from "class-validator"

export class CreateContactDto {
    @ApiProperty()
    @IsUUID()
    @IsString()
    userId: string

    @ApiProperty()
    @IsString()
    @IsPhoneNumber()
    phone: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string
}
