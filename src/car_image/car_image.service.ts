import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {  CarImage, Prisma } from '@prisma/client';

@Injectable()
export class CarImageService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: Prisma.CarImageCreateInput):Promise<CarImage> {
    const car= await this.prisma.carImage.create({
      data:createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.carImage.findMany()
  }

  async findOne(id: string) {
    return this.prisma.carImage.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car= await this.prisma.carImage.findUnique({
        where:{
          id:id
        }
      })
      if(!car){
        throw new NotFoundException(`Car with ID ${id} not found`);      }

      return this.prisma.carImage.update({
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
    const car = await this.prisma.carImage.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return this.prisma.carImage.delete({
      where: {
        id,
      },
    });
  }
}
