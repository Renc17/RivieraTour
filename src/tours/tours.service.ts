import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToursService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return await this.prisma.tours.findMany();
    }

    async getOne(tourId: string) {
        const foundTour = await this.findOne(tourId);
        if (!foundTour) {
            throw new HttpException('Tour Not Found', 404);
        }

        return foundTour;
    }

    async reset(tourId: string) {
        const foundTour = await this.findOne(tourId);
        if (!foundTour) {
            throw new HttpException('Tour Not Found', 404);
        }

        return await this.prisma.tours.update({
            where: { id: tourId },
            data: { left: 10 }
        });
    }

    private async findOne(tourId) {
        return await this.prisma.tours.findUnique({
            where: {
                id: tourId
            }
        });
    }
}
