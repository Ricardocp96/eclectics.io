import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from '../loans/loans.model';
import { User } from '../user/user.model'

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
  ) {}

  async applyForLoan(userId: number, amount: number): Promise<Loan> {

    const loanLimit = 1000; 
    if (amount > loanLimit) {
      throw new Error('Loan amount exceeds your loan limit');
    }
    
    const loan = this.loanRepository.create({
      amount,
      loanLimit,
      status: 'PENDING',
      user: { id: userId } as User,
    });

    return this.loanRepository.save(loan);
  }
  async getLoanStatus(userId: number): Promise<Loan[]> {
    const loans = await this.loanRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!loans) {
      throw new NotFoundException('No loans found for this user');
    }
    return loans;
  }
}
