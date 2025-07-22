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
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './loan.entity';

@Controller('loans')
@UsePipes(new ValidationPipe())
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    return await this.loanService.create(createLoanDto);
  }

  @Get()
  async findAll(): Promise<Loan[]> {
    return await this.loanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Loan> {
    return await this.loanService.findOne(id);
  }
} 