import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/shared/auth/auth.service';
import { AddClientDto } from './dto/add-client-dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { SECRET_TOKEN } from 'config';
import { LoginClientDto } from './dto/login-client-dto';

@Injectable()
export class AccountService {
    constructor(
        private authService: AuthService,
        private prisma: PrismaService
    ) {}

    async register(user: AddClientDto) {
        const clientExists = await this.prisma.client.findUnique({
            where: {
                email: user.email
            }
        });

        if (clientExists) {
            throw new HttpException(
                'Client has already an account',
                HttpStatus.FOUND
            );
        }

        const hash = await bcrypt.hash(user.password, 13);
        return await this.prisma.client.create({
            data: {
                username: user.username,
                email: user.email,
                password: hash
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });
    }

    async login(user: LoginClientDto) {
        const validUser = await this.authService.validateClient(
            user.email,
            user.password
        );

        try {
            return {
                authToken: jwt.sign(
                    {
                        username: validUser.username,
                        id: validUser.id,
                        email: validUser.email,
                        role: 'CLIENT'
                    },
                    SECRET_TOKEN,
                    { expiresIn: '1 hour' }
                )
            };
        } catch (err: any) {
            throw new HttpException(err.message, HttpStatus.BAD_GATEWAY);
        }
    }
}
