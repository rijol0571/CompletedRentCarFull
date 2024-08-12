import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CarFindexService } from './car_findex.service';
import { CreateCarFindexDto } from './dto/create-car_findex.dto';
import { UpdateCarFindexDto } from './dto/update-car_findex.dto';


@ApiTags('car-findex')
@Controller('car-findex')
export class CarFindexController {
  constructor(private readonly carFindexService: CarFindexService) {}

  @Post()
  create(@Body() createCarFindexDto: CreateCarFindexDto) {
    return this.carFindexService.create(createCarFindexDto);
  }

  @Get()
  findAll() {
    return this.carFindexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carFindexService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarFindexDto: UpdateCarFindexDto) {
    return this.carFindexService.update(id, updateCarFindexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carFindexService.remove(id);
  }
}
