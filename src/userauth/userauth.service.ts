import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class  UserauthService {
    constructor(
        private readonly usersService: UserService,
        private jwtService: JwtService,
        
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload);

        return {
            access_token: accessToken,
            username: user.username,
            id: user.id.toString()
        };
    }

    async register(email: string, username: string, password: string): Promise<User> {
        const existingUser = await this.usersService.findOne(username);
        if (existingUser) {
            throw new Error('Username is already taken');
        }

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);

        const newUser = await this.usersService.createUser({
            email,
           
            username,
            password: hashedPassword,
        });

        return newUser;
    }
}

