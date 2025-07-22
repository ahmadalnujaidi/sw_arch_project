import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnController } from './return.controller';
import { ReturnService } from './return.service';
import { Return } from './return.entity';
import { Loan } from '../loan/loan.entity';
import { Book } from '../book/book.entity';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Return, Loan, Book]),
    MemberModule,
  ],
  controllers: [ReturnController],
  providers: [ReturnService],
  exports: [ReturnService],
})
export class ReturnModule {} 