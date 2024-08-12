import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCarFindexDto } from './create-car_findex.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateCarFindexDto extends PartialType(CreateCarFindexDto) {
    @ApiProperty()
    @IsUUID()
    carId: string

    @IsUUID()
    @ApiProperty()
    userId: string

    @ApiProperty()
    @IsString()
    score: string
}
