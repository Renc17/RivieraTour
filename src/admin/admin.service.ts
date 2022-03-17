import { HttpException, Injectable } from '@nestjs/common';
import { Admin } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/shared/auth/auth.service';
import { LoginAdminDto } from './dto/login-admin-dto';
import { SECRET_TOKEN } from 'config';

@Injectable()
export class AdminService {
    constructor(
        private authService: AuthService,
        private prisma: PrismaService
    ) {}

    async login(user: LoginAdminDto) {
        const validUser = await this.authService.validateCredentials(
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
                        role: 'ADMIN'
                    },
                    SECRET_TOKEN,
                    { expiresIn: '1 hour' }
                )
            };
        } catch (err: any) {
            return {
                error: {
                    statusCode: '500',
                    message: 'internal Server Error',
                    error: err.message
                }
            };
        }
    }

    async changePassword(user: Admin, password: string) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id: user.id
            }
        });

        if (!admin) {
            throw new HttpException('Email is not correct', 401);
        }

        const hash = await bcrypt.hash(password, 13);
        return await this.prisma.admin.update({
            where: { id: user.id },
            data: {
                password: hash
            }
        });
    }
}
