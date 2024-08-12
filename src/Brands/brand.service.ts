import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Brand, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';



@Injectable()
export class BrandService {
  constructor(private readonly prisma:PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager:Cache
  ){}

  async create(createBrandDto: CreateBrandDto):Promise<Brand> {
    const brand=await this.prisma.brand.create({
      data:createBrandDto
    })
    return brand
  }

  async findAll() {
    const todos=await this.cacheManager.get('todos')
    console.log(todos);
    if(todos){
      return todos
    }
    const response=await this.prisma.brand.findMany()

    if(response){
      await this.cacheManager.set('todos', response)
      return response
    }
    return []
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
      throw new NotFoundException(`${id}ID's Company is not found`);
    }

    return this.prisma.brand.delete({
      where: {
        id,
      },
    });
  }
}
