import { Module } from '@nestjs/common';
import { CarFindexService } from './car_findex.service';
import { CarFindexController } from './car_findex.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CarFindexController],
  providers: [CarFindexService, PrismaService]
})
export class CarFindexModule {}
