import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AddBookingDto } from './dto/add-booking-dto';

@Controller('book')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Post('tour')
    async book(@Body() clientInfo: AddBookingDto) {
        return await this.bookingService.book(clientInfo);
    }

    @Delete('cancel/:id')
    async cancelBooking(@Param('id') bookingId: string) {
        return await this.bookingService.cancel(bookingId);
    }
}
