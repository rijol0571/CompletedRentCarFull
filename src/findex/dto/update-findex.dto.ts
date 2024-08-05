import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFindexDto } from './create-findex.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateFindexDto extends PartialType(CreateFindexDto) {
    @IsUUID()
    @ApiProperty()
    userId: string

    @IsString()
    @ApiProperty()
    score: string
}
