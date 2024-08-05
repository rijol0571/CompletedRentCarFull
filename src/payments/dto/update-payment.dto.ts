import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { PaymentStatus } from '@prisma/client';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
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
