import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, PrismaService]
})
export class BrandModule {}
