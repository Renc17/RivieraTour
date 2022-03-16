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

    // await prisma.tours.upsert({
    //     where: { id: randomUUID() }
    // });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
