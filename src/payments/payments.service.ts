import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Payments } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: CreatePaymentDto):Promise<Payments> {
    const car= await this.prisma.payments.create({
      data:createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.payments.findMany()
  }

  async findOne(id: string) {
    return this.prisma.payments.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car= await this.prisma.payments.findUnique({
        where:{
          id:id
        }
      })
      if(!car){
        throw new NotFoundException(`payment with ID ${id} not found`);      }

      return this.prisma.payments.update({
        where:{
          id,
        },
        data,
      })
      
      
    } catch (error) {
      throw new error
    }
  }

  async remove(id: string) {
    const car = await this.prisma.payments.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`payment with ID ${id} not found`);
    }

    return this.prisma.payments.delete({
      where: {
        id,
      },
    });
  }
}
