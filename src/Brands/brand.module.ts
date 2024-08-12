import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from '../prisma.service';


@Module({
  imports:[CacheModule.register()],
  controllers: [BrandController],
  providers: [BrandService, PrismaService]
})
export class BrandModule {}
