import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TokenManagement } from '@prisma/client';
import { CreateTokenManagementDto } from './dto/create-token_management.dto';

@Injectable()
export class TokenManagementService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: CreateTokenManagementDto):Promise<TokenManagement> {
    const car= await this.prisma.tokenManagement.create({
      data:createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.tokenManagement.findMany()
  }

  async findOne(id: string) {
    return this.prisma.tokenManagement.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car= await this.prisma.tokenManagement.findUnique({
        where:{
          id:id
        }
      })
      if(!car){
        throw new NotFoundException(`payment with ID ${id} not found`);      }

      return this.prisma.tokenManagement.update({
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
    const car = await this.prisma.tokenManagement.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`payment with ID ${id} not found`);
    }

    return this.prisma.tokenManagement.delete({
      where: {
        id,
      },
    });
  }
}
