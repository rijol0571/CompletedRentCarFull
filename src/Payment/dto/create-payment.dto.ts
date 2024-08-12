import { ApiProperty } from "@nestjs/swagger"
import { PaymentStatus } from "@prisma/client"

import { IsNumber, IsString, IsUUID } from "class-validator"

export class CreatePaymentDto {
    @ApiProperty()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsNumber()
    amount: number

    @ApiProperty()
    @IsString()
    method: string

    @ApiProperty({enum:[  'failed', 'pending', 'completed']})
    @IsString()
    status: PaymentStatus
}
