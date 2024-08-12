import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {  CarImage, Contacts, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCarDto: CreateContactDto):Promise<Contacts> {
    const car= await this.prisma.contacts.create({
      data:createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.contacts.findMany()
  }

  async findOne(id: string) {
    return this.prisma.contacts.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car= await this.prisma.contacts.findUnique({
        where:{
          id:id
        }
      })
      if(!car){
        throw new NotFoundException(`${id} ID's car not found`);      }

      return this.prisma.contacts.update({
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
    const car = await this.prisma.contacts.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`${id}ID's car not found`);
    }

    return this.prisma.contacts.delete({
      where: {
        id,
      },
    });
  }
}
