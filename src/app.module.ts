import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserauthController } from './userauth/userauth.controller';
import { UserauthService } from './userauth/userauth.service';
import { UserauthModule } from './userauth/userauth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { LoanController } from './loans/loans.controller';
import { LoanService } from './loans/loans.service';
import { LoansModule } from './loans/loans.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
    }),   
    UserauthModule, UserModule, LoansModule],
  controllers: [AppController, UserauthController, UserController, LoanController],
  providers: [AppService, UserauthService, UserService, LoanService],
  
})
export class AppModule {}
