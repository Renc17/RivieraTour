import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { BookingModule } from './booking/booking.module';
import { ToursModule } from './tours/tours.module';

@Module({
    imports: [AdminModule, SharedModule, BookingModule, ToursModule],
    controllers: [],
    providers: []
})
export class AppModule {}
