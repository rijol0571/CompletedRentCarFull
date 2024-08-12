import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindexService } from './findex.service';
import { CreateFindexDto } from './dto/create-findex.dto';
import { UpdateFindexDto } from './dto/update-findex.dto';


@ApiTags('findex')
@Controller('findex')
export class FindexController {
  constructor(private readonly findexService: FindexService) {}

  @Post()
  create(@Body() createFindexDto: CreateFindexDto) {
    return this.findexService.create(createFindexDto);
  }

  @Get()
  findAll() {
    return this.findexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findexService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFindexDto: UpdateFindexDto) {
    return this.findexService.update(id, updateFindexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.findexService.remove(id);
  }
}
