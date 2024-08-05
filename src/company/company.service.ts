import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../prisma.service';
import { Company, Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma:PrismaService){}

  async create(createCompanyDto: CreateCompanyDto):Promise<Company> {
    const company=await this.prisma.company.create({
      data:createCompanyDto
    })
    return company
  }

  async findAll() {
    return this.prisma.company.findMany()
  }

  async findOne(id: string) {
    return this.prisma.company.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data:any) {
    const company=await this.prisma.company.findUnique({
      where:{
        id:id
      }
    })

    if(!company){
      throw new NotFoundException('Not found')
    }

    return this.prisma.company.update({
      where:{
        id,
      },
      data,
    });

  }

  async remove(id: string) {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return this.prisma.company.delete({
      where: {
        id,
      },
    });
  }
}
