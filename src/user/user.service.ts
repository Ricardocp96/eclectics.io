import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,

  ) {}

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } });
  }

  async findOneById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userModel.create(user);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return this.userModel.save(newUser);
  }

 
   }

