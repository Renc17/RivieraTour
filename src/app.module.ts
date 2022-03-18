import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { BookingModule } from './booking/booking.module';
import { ToursModule } from './tours/tours.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AdminModule,
        SharedModule,
        BookingModule,
        ToursModule,
        MailModule,
        AccountModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
