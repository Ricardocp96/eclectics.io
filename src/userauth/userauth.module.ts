import { Module } from "@nestjs/common"
import {  UserModule } from "../user/user.module";
import { UserauthService } from "./userauth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { UserauthController } from '../userauth/userauth.controller';
import {  UserService } from "../user/user.service"
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { User } from "../user/user.model"
import { LocalStrategy } from './local.auth';




@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60s' },
  }), TypeOrmModule.forFeature([User]),
],
  providers: [UserauthService, UserService, LocalStrategy],
  controllers: [UserauthController],
})
export class UserauthModule { }