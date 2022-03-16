/*
  Warnings:

  - You are about to alter the column `email` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- DropIndex
DROP INDEX "Booking_email_key";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "email" SET DATA TYPE VARCHAR(100);
