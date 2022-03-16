import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { BookingModule } from './booking/booking.module';

@Module({
    imports: [AdminModule, SharedModule, BookingModule],
    controllers: [],
    providers: []
})
export class AppModule {}
