import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { ToursService } from './tours.service';

@Controller('tours')
export class ToursController {
    constructor(private toursService: ToursService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getTours() {
        return this.toursService.getAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getTourById(@Param('id') tourId: string) {
        return this.toursService.getOne(tourId);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async resetSeatsLeft(@Param('id') tourId: string) {
        return this.toursService.reset(tourId);
    }
}
