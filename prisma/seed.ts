import { PrismaClient } from '@prisma/client';
import { password } from '../config';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
const prisma = new PrismaClient();

async function main() {
    const hash = await bcrypt.hash(password, 13);

    await prisma.admin.upsert({
        where: { email: 'info@toursarandariviera.com' },
        update: {},
        create: {
            email: 'info@toursarandariviera.com',
            username: 'TourSarandaRiviera',
            password: hash
        }
    });

    await prisma.tours.createMany({
        data: [
            {
                id: randomUUID(),
                name: 'Saranda',
                capacity: 10,
                left: 10
            },
            {
                id: randomUUID(),
                name: 'Ksamil',
                capacity: 10,
                left: 10
            },
            {
                id: randomUUID(),
                name: 'Butrint',
                capacity: 10,
                left: 10
            },
            {
                id: randomUUID(),
                name: 'Blue Eye',
                capacity: 10,
                left: 10
            },
            {
                id: randomUUID(),
                name: 'Porto Palermo',
                capacity: 10,
                left: 10
            },
            {
                id: randomUUID(),
                name: 'Krorez',
                capacity: 10,
                left: 10
            },
            {
                id: randomUUID(),
                name: 'Village of Qeparo',
                capacity: 10,
                left: 10
            }
        ],
        skipDuplicates: true
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
