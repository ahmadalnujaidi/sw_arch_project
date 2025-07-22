import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.memberRepository.create(createMemberDto);
    return await this.memberRepository.save(member);
  }

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  async findOne(id: number): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(id);
    Object.assign(member, updateMemberDto);
    member.updatedAt = new Date();
    return await this.memberRepository.save(member);
  }

  async remove(id: number): Promise<void> {
    const member = await this.findOne(id);
    await this.memberRepository.remove(member);
  }

  async incrementBorrowCount(id: number): Promise<Member> {
    const member = await this.findOne(id);
    member.borrowCount += 1;
    member.updatedAt = new Date();
    return await this.memberRepository.save(member);
  }

  async incrementReturnCount(id: number): Promise<Member> {
    const member = await this.findOne(id);
    member.returnCount += 1;
    member.updatedAt = new Date();
    return await this.memberRepository.save(member);
  }
} 