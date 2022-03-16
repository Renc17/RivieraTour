import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AddBookingDto } from './dto/add-booking-dto';

@Controller('book')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Post('tour/:id')
    async book(@Body() clientInfo: AddBookingDto, @Param('id') tourId: string) {
        return await this.bookingService.book(tourId, clientInfo);
    }

    @Delete('cancel/:id')
    async cancelBooking(@Param('id') bookingId: string) {
        return await this.bookingService.cancel(bookingId);
    }
}
