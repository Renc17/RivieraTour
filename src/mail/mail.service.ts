import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailUser } from './interfaces/emailUser.interface';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(client: IEmailUser) {
        await this.mailerService.sendMail({
            to: client.email,
            subject: 'Booking Confirmation - Saranda Riviera Tour',
            template: 'confirmation',
            context: {
                name: client.name,
                day: client.date.day,
                month: client.date.month,
                seats: client.seats,
                adults: client.adults,
                children: client.children,
                price: client.price
            }
        });
    }
}
