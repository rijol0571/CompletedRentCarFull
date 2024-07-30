import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Auth, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async RefreshToken(payload: Record<string, any>): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: '12345',
      expiresIn: '15h',
    });
    return token;
  }

  async AccessToken(payload: Record<string, any>): Promise<string> {
    const token = await this.jwtService.signAsync(payload,{
      secret: '12345',
      expiresIn: '15m',
    });
    return token;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.auth.findUnique({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(createModelDto: Prisma.AuthCreateInput): Promise<Omit<Prisma.AuthCreateInput, 'password'>> {
    
    const hashedPassword = await bcrypt.hash(createModelDto.password, 10);
    const user = await this.prisma.auth.create({
      data: {
        ...createModelDto,
        password: hashedPassword,
      },
    });
    const { password, ...result } = user;
    return result;
  }

  async signIn(signInDto: Prisma.AuthCreateInput): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.auth.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.AccessToken(payload);
    const refreshToken = await this.RefreshToken(payload);

    return { accessToken, refreshToken };
  }

  async findAll() {
    return this.prisma.auth.findMany();
  }

  async findOne(id: string) {
    return this.prisma.auth.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: any) {
    const user = await this.prisma.auth.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.auth.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const user = await this.prisma.auth.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.auth.delete({
      where: {
        id,
      },
    });
  }
}

