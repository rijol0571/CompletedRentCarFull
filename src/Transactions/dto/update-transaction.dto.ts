import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus } from '@prisma/client';

import { CreateTransactionDto } from './create-transaction.dto';
import { IsDate, IsJSON, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsUUID()
    @ApiProperty()
    companyId: UUID

    @IsString()
    @IsUUID()
    @ApiProperty()
    userId: string

    @IsJSON()
    @ApiProperty()
    userData: JSON

    @IsString()
    @IsUUID()
    @ApiProperty()
    carId: string

    @IsJSON()
    @IsUUID()
    @ApiProperty()
    carData: JSON


    @IsString()
    @ApiProperty()
    price: string

    @IsDate()
    @ApiProperty()
    startDate: Date

    @IsDate()
    @ApiProperty()
    endDate: Date

    @IsString()
    @ApiProperty()
    status: TransactionStatus
}
