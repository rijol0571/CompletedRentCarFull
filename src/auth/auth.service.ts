import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { SignUpAuthDto } from './dto/sign_up.dto';
import { SignInAuthDto } from './dto/sign_in.dto';
import { v4 as uuidv4 } from 'uuid';
import { QueryDto } from './dto/query_filer.dto';
import { forgetPasswordDto } from './dto/forget_password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async RefreshToken(payload: Record<string, any>): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET || '12345',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '15h',
    });
    return token;
  }

  async AccessToken(payload: Record<string, any>): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET || '12345',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
    });
    return token;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.auth.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(createAuthDto: SignUpAuthDto): Promise<Omit<Prisma.AuthCreateInput, 'password'>> {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const user = await this.prisma.auth.create({
      data: {
        ...createAuthDto,
        password: hashedPassword,
      },
    });
    const { password, ...result } = user;
    return result;
  }

  async signIn(signInDto: SignInAuthDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.auth.findUnique({
      where: { email: signInDto.email },
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

  async forgetPassword(forget_password: forgetPasswordDto): Promise<{ message: string }> {
    const email=forget_password.email
    const user = await this.prisma.auth.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

    await this.prisma.auth.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    const resetLink = `${process.env.FORGET_URL}/reset-password?token=${resetToken}&email=${email}`;

    const transporter = nodemailer.createTransport({
      service: 'ethereal',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset Request',
      html: `Hi there,

We received a request to reset your password. Click the link below to set a new password:

<a href="${resetLink}">Reset Password</a>

This link is valid for the next 1 hour. If you did not request a password reset, please ignore this email or contact our support team.

Best regards,
[Your Company Name]`,
    });

    return { message: 'Password reset email sent' };
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.prisma.auth.findFirst({
      where: { resetToken: token },
    });

    if (!user || new Date() > user.resetTokenExpiry) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.auth.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });

    return { message: 'Password successfully reset' };
  }

  async findAll(query: {
    filter?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const { filter, sortBy, order, page = 1, limit = 10 } = query;
  
    const where: Prisma.AuthWhereInput = filter
      ? {
          OR: [
            { email: { contains: filter, mode: 'insensitive' } },
          ],
        }
      : {};
  
    const orderBy = sortBy ? { [sortBy]: order || 'asc' } : undefined;
  
    const total = await this.prisma.auth.count({ where });
  
    const items = await this.prisma.auth.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return { total, items };
  }
  

  async findOne(id: string) {
    const user = await this.prisma.auth.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateAuthDto: SignInAuthDto) {
    const user = await this.prisma.auth.update({
      where: { id },
      data: updateAuthDto,
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.auth.delete({
      where: { id },
    });
    return user;
  }
}

