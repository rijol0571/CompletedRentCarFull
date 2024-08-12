import { Module } from '@nestjs/common';

import { EmailVerificationService } from './email_verification.service';
import { EmailVerificationController } from './email_verification.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService, PrismaService]
})
export class EmailVerificationModule {}
