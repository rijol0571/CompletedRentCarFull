import { ApiProperty } from "@nestjs/swagger"
import { TransactionStatus } from "@prisma/client"

import { IsDate, IsJSON, IsString, IsUUID } from "class-validator"
//import { isFloat32Array } from "util/types"

export class CreateTransactionDto {
    @IsUUID()
    @ApiProperty()
    companyId: string

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
    @ApiProperty({enum:[  'debit', 'credit']})
    status: TransactionStatus
}
