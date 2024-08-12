import { Module } from '@nestjs/common';

import { CarImageService } from './car_image.service';
import { CarImageController } from './car_image.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CarImageController],
  providers: [CarImageService, PrismaService]
})
export class CarImageModule {}
