import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  // Book information (moved from books table)
  @Column({ type: 'int' })
  bookId: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  desc: string;

  @Column({ type: 'varchar', length: 100 })
  author: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  // Member information
  @Column({ type: 'int' })
  memberId: number;

  @Column({ type: 'varchar', length: 255 })
  memberName: string;

  @Column({ type: 'varchar', length: 255 })
  memberEmail: string;

  @Column({ type: 'varchar', length: 20 })
  memberPhone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 