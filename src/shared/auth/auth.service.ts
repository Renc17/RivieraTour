import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async validateCredentials(email: string, password: string) {
        const user = await this.prisma.admin.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new HttpException('Email is not correct', 401);
        }

        const passwordValidation = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordValidation) {
            throw new HttpException('Password is not correct', 401);
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email
        };
    }

    async validateClient(email: string, password: string) {
        const user = await this.prisma.client.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new HttpException('Email is not correct', 401);
        }

        const passwordValidation = await bcrypt.compare(
            password,
            user.password
        );
        if (!passwordValidation) {
            throw new HttpException('Password is not correct', 401);
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email
        };
    }
}
