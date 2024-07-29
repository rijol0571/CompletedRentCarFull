import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class SignUpAuthDto {

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: "sign up user email",
    default: "test@test.com"
  })
  email: string


  @IsNotEmpty()
  @ApiProperty()
  password: string
}