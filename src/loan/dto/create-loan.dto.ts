import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLoanDto {
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  memberId: number;
} 