import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}

  async create(createModelDto: CreateUserDto) {
    const user=await this.prisma.user.create({
      data:createModelDto
    })
    return user
  }

  async findAll() {
    return this.prisma.user.findMany()
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data:any) {
    const user=await this.prisma.user.findUnique({
      where:{
        id:id
      }
    })

    if(!user){
      throw new NotFoundException('Not found')
    }

    return this.prisma.user.update({
      where:{
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.delete({
      where: {
        id,
      },
    });  
  }
}
