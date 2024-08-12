import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

import { CreateUserDto } from './create-user.dto';
import { IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
    @ApiProperty()
    role: UserRole
}
