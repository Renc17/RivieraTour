-- CreateTable
CREATE TABLE "Tours" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,

    CONSTRAINT "Tours_pkey" PRIMARY KEY ("id")
);
