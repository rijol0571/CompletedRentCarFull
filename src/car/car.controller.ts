import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Prisma } from '@prisma/client';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryDto } from './dto/query_filer.dto';

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

 
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
    return this.carService.findAll({ filter, sortBy, order, page: pageNum, limit: limitNum });

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(id);
  }
}
