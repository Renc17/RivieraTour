import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ToursService } from 'src/tours/tours.service';
import { AuthService } from './auth/auth.service';

@Module({
    providers: [AuthService, PrismaService, ToursService],
    exports: [AuthService, PrismaService, ToursService]
})
export class SharedModule {}
