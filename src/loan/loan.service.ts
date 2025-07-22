import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';
import { Book } from '../book/book.entity';
import { Member } from '../member/member.entity';
import { MemberService } from '../member/member.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly memberService: MemberService,
  ) {}

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const { bookId, memberId } = createLoanDto;

    // Find the book (must exist and be available)
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found or already borrowed`);
    }

    // Find the member
    const member = await this.memberRepository.findOne({ where: { id: memberId } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }

    // Check if this book is currently available (exists in books table)
    // If the book exists in books table, it's available even if there are historical loan records

    // Create the loan with book and member information
    const loan = this.loanRepository.create({
      bookId: book.id,
      title: book.title,
      desc: book.desc,
      author: book.author,
      price: book.price,
      memberId: member.id,
      memberName: member.name,
      memberEmail: member.email,
      memberPhone: member.phone,
    });

    // Save the loan
    const savedLoan = await this.loanRepository.save(loan);

    // Remove the book from books table
    await this.bookRepository.remove(book);

    // Increment member's borrow count
    await this.memberService.incrementBorrowCount(memberId);

    return savedLoan;
  }

  async findAll(): Promise<Loan[]> {
    return await this.loanRepository.find();
  }

  async findOne(id: number): Promise<Loan> {
    const loan = await this.loanRepository.findOne({ where: { id } });
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    return loan;
  }

  async findByMember(memberId: number): Promise<Loan[]> {
    return await this.loanRepository.find({ where: { memberId } });
  }

  async findByBook(bookId: number): Promise<Loan> {
    const loan = await this.loanRepository.findOne({ where: { bookId } });
    if (!loan) {
      throw new NotFoundException(`Loan for book ID ${bookId} not found`);
    }
    return loan;
  }
} 