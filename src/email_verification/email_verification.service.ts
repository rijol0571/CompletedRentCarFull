import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {  Customers, EmailVerification } from '@prisma/client';
import { CreateEmailVerificationDto } from './dto/create-email_verification.dto';

@Injectable()
export class EmailVerificationService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: CreateEmailVerificationDto):Promise<EmailVerification> {
    const car= await this.prisma.emailVerification.create({
      data:createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.emailVerification.findMany()
  }

  async findOne(id: string) {
    return this.prisma.emailVerification.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car= await this.prisma.emailVerification.findUnique({
        where:{
          id:id
        }
      })
      if(!car){
        throw new NotFoundException(`email with ID ${id} not found`);      }

      return this.prisma.emailVerification.update({
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
    const car = await this.prisma.emailVerification.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`email with ID ${id} not found`);
    }

    return this.prisma.emailVerification.delete({
      where: {
        id,
      },
    });
  }
}
