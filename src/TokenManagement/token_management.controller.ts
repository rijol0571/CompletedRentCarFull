import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TokenManagementService } from './token_management.service';
import { CreateTokenManagementDto } from './dto/create-token_management.dto';
import { UpdateTokenManagementDto } from './dto/update-token_management.dto';


@ApiTags('token-management')
@Controller('token-management')
export class TokenManagementController {
  constructor(private readonly tokenManagementService: TokenManagementService) {}

  @Post()
  create(@Body() createTokenManagementDto: CreateTokenManagementDto) {
    return this.tokenManagementService.create(createTokenManagementDto);
  }

  @Get()
  findAll() {
    return this.tokenManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenManagementService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenManagementDto: UpdateTokenManagementDto) {
    return this.tokenManagementService.update(id, updateTokenManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenManagementService.remove(id);
  }
}
