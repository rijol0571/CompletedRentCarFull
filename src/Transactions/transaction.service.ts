import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma.service';


@Injectable()
export class TransactionService {
  constructor(private readonly prisma:PrismaService){}

  async create(createTransactionDto:Prisma.TransactionCreateInput) {
    const transaction=await this.prisma.transaction.create({
      data:createTransactionDto
    })
    return transaction
  }

  async findAll() {
    return this.prisma.transaction.findMany()
  }

  async findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data:any) {
    const transaction=await this.prisma.transaction.findUnique({
      where:{
        id:id
      }
    })

    if(!transaction){
      throw new NotFoundException('Not fount')
    }

    return this.prisma.transaction.update({
      where:{
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`${id}ID not found with this transaction`);
    }

    return this.prisma.transaction.delete({
      where: {
        id,
      },
    });  
  }
}
