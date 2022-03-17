import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { TourDatesDto } from './tour-dates-dto';

export class AddBookingDto {
    @IsNotEmpty()
    tourId: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    date: TourDatesDto;

    @IsNotEmpty()
    name: string;
    message?: string;

    @IsNotEmpty()
    @IsNumber()
    adults: number;

    @IsNumber()
    children?: number;
}
