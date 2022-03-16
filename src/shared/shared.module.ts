import { Module } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma.service';
import { ToursService } from 'src/tours/tours.service';
import { AuthService } from './auth/auth.service';

@Module({
    providers: [AuthService, PrismaService, ToursService, MailService],
    exports: [AuthService, PrismaService, ToursService, MailService]
})
export class SharedModule {}
