import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateContactDto } from './create-contact.dto';
import { IsEmail, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class UpdateContactDto extends PartialType(CreateContactDto) {
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
