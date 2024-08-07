import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class forgetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string
}