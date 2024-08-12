import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/sign_up.dto';
import { SignInAuthDto } from './dto/sign_in.dto';
import { AccessTokenGuard } from './common/guards/accessToken';
import { QueryDto } from './dto/query_filer.dto';
import { forgetPasswordDto } from './dto/forget_password.dto';
import { resetPasswordDto } from './dto/reset_password.dto';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createAuthDto: SignUpAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('sign-in')
  signIn(@Body() createAuthDto: SignInAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('forget-password')
  forgetPassword(@Body() forgetPassword: forgetPasswordDto) {
    return this.authService.forgetPassword(forgetPassword);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPassworddto: resetPasswordDto) {
    return this.authService.resetPassword(resetPassworddto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiQuery({ name: 'filter', required: false, description: 'Filter by email or username' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Sort by field name' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Order of sorting' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page', example: 10 })
  findAll(@Query() query: QueryDto) {
    console.log('Received query:', query); 

    const { filter, sortBy, order, page, limit } = query;

    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    console.log('Converted pageNum:', pageNum);
    console.log('Converted limitNum:', limitNum);
    return this.authService.findAll({ filter, sortBy, order, page: pageNum, limit: limitNum });

  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: SignInAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}


