import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../book/book.entity';
import { Member } from '../member/member.entity';
import { Loan } from '../loan/loan.entity';
import { Return } from '../return/return.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'sw_arch_project',
  entities: [Book, Member, Loan, Return],
  synchronize: process.env.NODE_ENV !== 'production', // Only for development
  logging: process.env.NODE_ENV === 'development',
}; 