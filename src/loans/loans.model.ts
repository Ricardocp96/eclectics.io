import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.model'

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1000 })
  loanLimit: number; 

  @Column({ default: 'PENDING' })
  status: string; 

  @ManyToOne(() => User, (user) => user.loans)
  user: User;
}
