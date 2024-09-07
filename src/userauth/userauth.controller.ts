import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserauthService } from './userauth.service'
import { User } from '../user/user.model'

@Controller()
export class UserauthController {
    constructor(private authService: UserauthService) { }

    @Post('auth/login')
    async login(@Body() loginDto: { username: string, password: string }) {
        const { username, password } = loginDto;
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() userData: User): Promise<User> {
        const { email,  username, password } = userData;
        return this.authService.register(email,  username, password);
    }
}
