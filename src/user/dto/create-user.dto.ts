import { ApiProperty } from "@nestjs/swagger"
import { UserRole } from "@prisma/client"
import { IsPhoneNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsPhoneNumber()
    @ApiProperty()
    phone: string

    @IsString()
    @ApiProperty()
    fullName: string

    @IsString()
    @ApiProperty()
    avatar: string

    @IsString()
    @ApiProperty({ enum: [  'client', 'owner', 'supervisor', 'admin']})
    role: UserRole
}
