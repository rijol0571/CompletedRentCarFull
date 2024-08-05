import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ModelService {
  constructor(private readonly prisma:PrismaService){}

  async create(createModelDto: CreateModelDto) {
    const file=await this.prisma.model.create({
      data:createModelDto
    })
    return file
  }

  async findAll() {
    return this.prisma.model.findMany()
  }

  async findOne(id: string) {
    return this.prisma.model.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data:any) {
    const model=await this.prisma.model.findUnique({
      where:{
        id:id
      }
    })

    if(!model){
      throw new NotFoundException('Not found')
    }

    return this.prisma.model.update({
      where:{
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const model = await this.prisma.model.findUnique({
      where: {
        id,
      },
    });

    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }

    return this.prisma.model.delete({
      where: {
        id,
      },
    });  
  }
}
