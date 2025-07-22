import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnService } from './return.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { Return } from './return.entity';

@Controller('returns')
@UsePipes(new ValidationPipe())
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @Post()
  async create(@Body() createReturnDto: CreateReturnDto): Promise<Return> {
    return await this.returnService.create(createReturnDto);
  }

  @Get()
  async findAll(): Promise<Return[]> {
    return await this.returnService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Return> {
    return await this.returnService.findOne(id);
  }
} 