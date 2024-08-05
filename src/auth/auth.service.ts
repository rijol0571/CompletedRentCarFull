import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Auth, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { SignUpAuthDto } from './dto/sign_up.dto';
import { SignInAuthDto } from './dto/sign_in.dto';
import { v4 as uuidv4 } from 'uuid';

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

  async forgetPassword(email: string): Promise<{ message: string }> {
    const user = await this.prisma.auth.findUnique({
      where: {
        email,
      },
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

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
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

