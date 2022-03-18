import { Module } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma.service';
import { ToursService } from 'src/tours/tours.service';
import { AuthService } from './auth/auth.service';
import { StripeService } from './stripe/stripe.service';

@Module({
    providers: [
        AuthService,
        PrismaService,
        ToursService,
        MailService,
        StripeService
    ],
    exports: [
        AuthService,
        PrismaService,
        ToursService,
        MailService,
        StripeService
    ]
})
export class SharedModule {}
