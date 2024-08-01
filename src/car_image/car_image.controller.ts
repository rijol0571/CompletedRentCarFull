import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarImageService } from './car_image.service';
import { CreateCarImageDto } from './dto/create-car_image.dto';
import { UpdateCarImageDto } from './dto/update-car_image.dto';
import { Prisma } from '@prisma/client';

@Controller('car-image')
export class CarImageController {
  constructor(private readonly carImageService: CarImageService) {}

  @Post()
  create(@Body() createCarImageDto: Prisma.CarImageCreateInput) {
    return this.carImageService.create(createCarImageDto);
  }

  @Get()
  findAll() {
    return this.carImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carImageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarImageDto: UpdateCarImageDto) {
    return this.carImageService.update(id, updateCarImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carImageService.remove(id);
  }
}
