import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth/auth.service';

@Module({
    providers: [AuthService, PrismaService],
    exports: [AuthService, PrismaService]
})
export class SharedModule {}
