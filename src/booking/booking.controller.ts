import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { ClientAuthGuard } from 'src/shared/guard/clientAuth.guard';
import { BookingService } from './booking.service';
import { AddBookingDto } from './dto/add-booking-dto';

@Controller('book')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @UseGuards(ClientAuthGuard)
    @Post('tour')
    async book(@Body() clientInfo: AddBookingDto, @Req() req: any) {
        return await this.bookingService.book(clientInfo, req.user);
    }

    @Delete('cancel/:id')
    async cancelBooking(@Param('id') bookingId: string) {
        return await this.bookingService.cancel(bookingId);
    }

    @Get()
    @UseGuards(AuthGuard)
    async getBookings() {
        return await this.bookingService.getAll();
    }

    @Get('myBookings')
    @UseGuards(ClientAuthGuard)
    async getMyBookings(@Req() req: any) {
        return await this.bookingService.getAllMine(req.user.id);
    }
}
