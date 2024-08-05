import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Rentals } from '@prisma/client';
import { CreateRentalDto } from './dto/create-rental.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: CreateRentalDto):Promise<Rentals> {
    const car= await this.prisma.rentals.create({
      data:createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.rentals.findMany()
  }

  async findOne(id: string) {
    return this.prisma.rentals.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car= await this.prisma.rentals.findUnique({
        where:{
          id:id
        }
      })
      if(!car){
        throw new NotFoundException(`payment with ID ${id} not found`);      }

      return this.prisma.rentals.update({
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
    const car = await this.prisma.rentals.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`payment with ID ${id} not found`);
    }

    return this.prisma.rentals.delete({
      where: {
        id,
      },
    });
  }
}