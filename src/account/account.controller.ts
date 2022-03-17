import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { AddClientDto } from './dto/add-client-dto';
import { Response } from 'express';
import { LoginClientDto } from './dto/login-client-dto';

// TODO: add authGuard for client accounts

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post('register')
    async register(@Body() credentials: AddClientDto, @Res() res: Response) {
        const response = await this.accountService.register(credentials);
        return res.status(HttpStatus.OK).send(response);
    }

    @Post('login')
    async login(@Body() credentials: LoginClientDto, @Res() res: Response) {
        const response = await this.accountService.login(credentials);
        return res.status(HttpStatus.OK).send(response);
    }
}
