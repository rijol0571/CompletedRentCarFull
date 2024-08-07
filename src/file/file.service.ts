import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createFileDto: CreateFileDto) {
    const file = await this.prisma.file.create({
      data: createFileDto
    })
    return file
  }

  findAll() {
    return this.prisma.file.findMany()
  }

  findOne(id: string) {
    return this.prisma.file.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: string, data: any) {

    const file = await this.prisma.file.findUnique({
      where: {
        id: id
      }
    })

    if (!file) {
      throw new NotFoundException('Not found')
    }

    return this.prisma.file.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const file = await this.prisma.file.findUnique({
      where: {
        id,
      },
    });

    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    return this.prisma.file.delete({
      where: {
        id,
      },
    });
  }
}