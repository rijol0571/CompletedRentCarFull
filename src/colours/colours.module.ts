import { Module } from '@nestjs/common';
import { ColoursService } from './colours.service';
import { ColoursController } from './colours.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ColoursController],
  providers: [ColoursService, PrismaService]
})
export class ColoursModule {}
