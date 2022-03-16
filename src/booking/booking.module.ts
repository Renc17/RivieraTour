import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [SharedModule],
    providers: [BookingService],
    controllers: [BookingController]
})
export class BookingModule {}
