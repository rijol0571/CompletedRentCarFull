import { Module } from '@nestjs/common';
import { TokenManagementService } from './token_management.service';
import { TokenManagementController } from './token_management.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TokenManagementController],
  providers: [TokenManagementService, PrismaService]
})
export class TokenManagementModule {}
