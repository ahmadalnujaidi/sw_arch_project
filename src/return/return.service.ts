import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Return } from './return.entity';
import { Loan } from '../loan/loan.entity';
import { Book } from '../book/book.entity';
import { MemberService } from '../member/member.service';
import { CreateReturnDto } from './dto/create-return.dto';

@Injectable()
export class ReturnService {
  constructor(
    @InjectRepository(Return)
    private readonly returnRepository: Repository<Return>,
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly memberService: MemberService,
  ) {}

  async create(createReturnDto: CreateReturnDto): Promise<Return> {
    const { bookId, memberId } = createReturnDto;

    // Find the loan
    const loan = await this.loanRepository.findOne({ 
      where: { bookId, memberId } 
    });
    if (!loan) {
      throw new NotFoundException(`No active loan found for book ID ${bookId} and member ID ${memberId}`);
    }

    // Create the return record
    const returnRecord = this.returnRepository.create({
      bookId: loan.bookId,
      title: loan.title,
      desc: loan.desc,
      author: loan.author,
      price: loan.price,
      memberId: loan.memberId,
      memberName: loan.memberName,
      memberEmail: loan.memberEmail,
      memberPhone: loan.memberPhone,
    });

    // Save the return record
    const savedReturn = await this.returnRepository.save(returnRecord);

    // Restore the book to books table with last_borrowed_by
    const restoredBook = this.bookRepository.create({
      id: loan.bookId,
      title: loan.title,
      desc: loan.desc,
      author: loan.author,
      price: loan.price,
      last_borrowed_by: loan.memberId,
      createdAt: loan.createdAt,
      updatedAt: new Date(),
    });
    await this.bookRepository.save(restoredBook);

    // Keep the loan record for history - don't delete it

    // Increment member's return count
    await this.memberService.incrementReturnCount(memberId);

    return savedReturn;
  }

  async findAll(): Promise<Return[]> {
    return await this.returnRepository.find();
  }

  async findOne(id: number): Promise<Return> {
    const returnRecord = await this.returnRepository.findOne({ where: { id } });
    if (!returnRecord) {
      throw new NotFoundException(`Return record with ID ${id} not found`);
    }
    return returnRecord;
  }

  async findByMember(memberId: number): Promise<Return[]> {
    return await this.returnRepository.find({ where: { memberId } });
  }

  async findByBook(bookId: number): Promise<Return[]> {
    return await this.returnRepository.find({ where: { bookId } });
  }
} 