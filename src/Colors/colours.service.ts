import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {  CarImage, Colours,  } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { CreateColourDto } from './dto/create-colour.dto';

@Injectable()
export class ColoursService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: CreateColourDto):Promise<Colours> {
    const car= await this.prisma.colours.create({
      data:createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.colours.findMany()
  }

  async findOne(id: string) {
    return this.prisma.colours.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car= await this.prisma.colours.findUnique({
        where:{
          id:id
        }
      })
      if(!car){
        throw new NotFoundException(`${id}ID's colour not found`);      }

      return this.prisma.colours.update({
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
    const car = await this.prisma.colours.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`${id}ID's colour not found`);
    }

    return this.prisma.colours.delete({
      where: {
        id,
      },
    });
  }
}
