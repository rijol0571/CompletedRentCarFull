import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCarImageDto } from './create-car_image.dto';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class UpdateCarImageDto extends PartialType(CreateCarImageDto) {
    @IsString()
    @IsUUID()
    @ApiProperty()
    carId: string

    @IsString()
    @IsUrl()
    @ApiProperty()
    url: string

    @IsString()
    @ApiProperty()
    mimetype: string

    @ApiProperty()
    size: string
}
