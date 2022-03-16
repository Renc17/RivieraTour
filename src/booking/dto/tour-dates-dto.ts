import { IsNotEmpty } from 'class-validator';
import { monthsEnum } from 'src/enums/monthsEnum';

export class TourDatesDto {
    @IsNotEmpty()
    day: string;
    @IsNotEmpty()
    month: monthsEnum;
}
