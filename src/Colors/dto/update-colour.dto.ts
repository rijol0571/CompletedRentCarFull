import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateColourDto } from './create-colour.dto';
import { IsString } from 'class-validator';

export class UpdateColourDto extends PartialType(CreateColourDto) {
    @ApiProperty()
    @IsString()
    name:string
}
