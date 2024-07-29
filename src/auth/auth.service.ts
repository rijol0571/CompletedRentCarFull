import { Injectable, NotFoundException } from '@nestjs/common';
import { SignUpAuthDto } from './dto/sign_up.dto';
import { SignInAuthDto } from './dto/sign_in.dto';
import { PrismaService } from 'src/prisma.service';
import { Auth, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma:PrismaService,
    private readonly jwtService:JwtService
  ){}

  async RefreshToken(){
    const token=this.jwtService
  }

  async signUp(createModelDto: Prisma.AuthCreateInput):Promise<Omit<Prisma.AuthCreateInput, 'password'>> {
    const user=await this.prisma.auth.create({
      data:createModelDto
    })
    return user
  }

  async signIn(createModelDto: Prisma.AuthCreateInput):Promise<Omit<Prisma.AuthCreateInput, 'password'>> {
    const user=await this.prisma.auth.findUnique({
      where:{
        email:createModelDto.email
      }
    })
    return user
  }

  async findAll() {
    return this.prisma.auth.findMany()
  }

  async findOne(id: string) {
    return this.prisma.auth.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(id: string, data:any) {
    const user=await this.prisma.auth.findUnique({
      where:{
        id:id
      }
    })

    if(!user){
      throw new NotFoundException('Not found')
    }

    return this.prisma.auth.update({
      where:{
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

    return this.prisma.user.delete({
      where: {
        id,
      },
    });  
  }
}
