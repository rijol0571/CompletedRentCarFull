import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Car, Prisma } from '@prisma/client';

import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from '../prisma.service';



@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: CreateCarDto):Promise<Car> {
    const car= await this.prisma.car.create({
      data:createCarDto
    })
    return car
  }

  async findAll(query: {
    filter?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const { filter, sortBy, order, page = 1, limit = 10 } = query;
  
    const where: Prisma.CarWhereInput = filter
      ? {
          OR: [
            { name: { contains: filter, mode: 'insensitive' } },
          ],
        }
      : {};
  
    const orderBy = sortBy ? { [sortBy]: order || 'asc' } : undefined;
  
    const total = await this.prisma.car.count({ where });
  
    const items = await this.prisma.car.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return { total, items };
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
