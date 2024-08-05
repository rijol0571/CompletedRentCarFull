import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTokenManagementDto } from './create-token_management.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateTokenManagementDto extends PartialType(CreateTokenManagementDto) {
    @IsUUID()
    @ApiProperty()
    userId: string

    @IsString()
    @ApiProperty()
    token: string
}
