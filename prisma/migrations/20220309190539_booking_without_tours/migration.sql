/*
  Warnings:

  - You are about to drop the column `tourId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Tours` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_tourId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "tourId";

-- DropTable
DROP TABLE "Tours";
