import { HttpException, Injectable } from '@nestjs/common';
import { monthsEnum } from 'src/enums/monthsEnum';
import { ChildrenPrice, NormalPriceEnum } from 'src/enums/pricesEnum';
import { PrismaService } from 'src/prisma.service';
import { AddBookingDto } from './dto/add-booking-dto';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) {}

    async book(tourId: string, client: AddBookingDto) {
        // find tour
        // check if exists

        // book tickets on tour, occupy seats

        if (!Object.values(monthsEnum).includes(client.date.month)) {
            throw new HttpException(
                client.date.month + ' Not Found: date is not available',
                404
            );
        }
        const price = this.calculatePrice(client);
        return await this.prisma.booking.create({
            data: {
                name: client.name,
                email: client.email,
                seats: client.adults + client.children,
                message: client.message,
                price: price.toString()
            }
        });
    }

    async cancel(bookingId: string) {
        const foundBooking = await this.findOne(bookingId);
        if (!foundBooking) {
            throw new HttpException('Booking Not Found', 404);
        }

        // free seats
        // confirm by admin

        return await this.prisma.booking.delete({
            where: {
                id: bookingId
            }
        });
    }

    private calculatePrice(client: AddBookingDto) {
        const pricePerAdult: NormalPriceEnum = (<any>NormalPriceEnum)[
            client.date.month
        ];

        const pricePerChild: ChildrenPrice = (<any>ChildrenPrice)[
            client.date.month
        ];

        const adultPrice = client.adults * pricePerAdult;
        const childrenPrice = client.children * pricePerChild;

        return adultPrice + childrenPrice;
    }

    private async findOne(bookingId) {
        return await this.prisma.booking.findUnique({
            where: {
                id: bookingId
            }
        });
    }
}
