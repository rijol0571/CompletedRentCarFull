import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { AccessTokenStrategy } from './common/strategy/access.strategy';

@Module({
  imports:[JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AccessTokenStrategy]
})
export class AuthModule {}
