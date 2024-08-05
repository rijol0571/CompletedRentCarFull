import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma.service';
import { Car, Prisma } from '@prisma/client';
import { types } from 'util';

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: CreateCarDto):Promise<Car> {
    const car= await this.prisma.car.create({
      data:createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.car.findMany()
  }

  async findOne(id: string) {
    return this.prisma.car.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car= await this.prisma.car.findUnique({
        where:{
          id:id
        }
      })
      if(!car){
        throw new NotFoundException(`Car with ID ${id} not found`);      }

      return this.prisma.car.update({
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
    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return this.prisma.car.delete({
      where: {
        id,
      },
    });
  }
}
