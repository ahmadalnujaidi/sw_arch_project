import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('returns')
export class Return {
  @PrimaryGeneratedColumn()
  id: number;

  // Book information
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
} 