import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Brand, Prisma } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private readonly prisma:PrismaService){}

  async create(createBrandDto: Prisma.BrandCreateInput):Promise<Brand> {
    const brand=await this.prisma.brand.create({
      data:createBrandDto
    })
    return brand
  }

  async findAll() {
    return this.prisma.brand.findMany()
  }

  async findOne(id: string) {
    return this.prisma.brand.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data:any) {
    const brand=await this.prisma.brand.findUnique({
      where:{
        id:id
      }
    })

    if(!brand){
      throw new NotFoundException('Not found')
    }

    return this.prisma.brand.update({
      where:{
        id,
      },
      data,
    });

  }

  async remove(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: {
        id,
      },
    });

    if (!brand) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return this.prisma.brand.delete({
      where: {
        id,
      },
    });
  }
}
