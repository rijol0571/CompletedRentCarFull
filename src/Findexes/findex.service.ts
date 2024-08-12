import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Findex } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { CreateFindexDto } from './dto/create-findex.dto';

@Injectable()
export class FindexService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: CreateFindexDto):Promise<Findex> {
    const car= await this.prisma.findex.create({
      data:createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.findex.findMany()
  }

  async findOne(id: string) {
    return this.prisma.findex.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car= await this.prisma.findex.findUnique({
        where:{
          id:id
        }
      })
      if(!car){
        throw new NotFoundException(` ${id}ID's findex not found`);      }

      return this.prisma.findex.update({
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
    const car = await this.prisma.findex.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`${id}ID's findex not found`);
    }

    return this.prisma.findex.delete({
      where: {
        id,
      },
    });
  }
}
