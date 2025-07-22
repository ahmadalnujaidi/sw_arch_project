import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { LoanModule } from './loan/loan.module';
import { ReturnModule } from './return/return.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    BookModule,
    MemberModule,
    LoanModule,
    ReturnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
