import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CarFindex } from '@prisma/client';
import { CreateCarFindexDto } from './dto/create-car_findex.dto';

@Injectable()
export class CarFindexService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCarDto: CreateCarFindexDto): Promise<CarFindex> {
    const car = await this.prisma.carFindex.create({
      data: createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.carFindex.findMany()
  }

  async findOne(id: string) {
    return this.prisma.carFindex.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car = await this.prisma.carFindex.findUnique({
        where: {
          id: id
        }
      })
      if (!car) {
        throw new NotFoundException(`Car with ID ${id} not found`);
      }

      return this.prisma.carFindex.update({
        where: {
          id,
        },
        data,
      })


    } catch (error) {
      throw new error
    }
  }

  async remove(id: string) {
    const car = await this.prisma.carFindex.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return this.prisma.carFindex.delete({
      where: {
        id,
      },
    });
  }
}
