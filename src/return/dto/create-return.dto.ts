import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateReturnDto {
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  memberId: number;
} 