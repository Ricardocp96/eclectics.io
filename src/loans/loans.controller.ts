import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { LoanService } from './loans.service'

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('apply')
  async applyForLoan(@Body() applyLoanDto: { userId: number; amount: number }) {
    const { userId, amount } = applyLoanDto;
    return this.loanService.applyForLoan(userId, amount);
  }

  @Get(':userId/status')
  async getLoanStatus(@Param('userId') userId: number) {
    return this.loanService.getLoanStatus(userId);
  }
}

