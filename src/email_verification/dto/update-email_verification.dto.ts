import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEmailVerificationDto } from './create-email_verification.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateEmailVerificationDto extends PartialType(CreateEmailVerificationDto) {
    @ApiProperty()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsString()
    token: string
}
