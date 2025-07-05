-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('mudah', 'menengah', 'sulit', 'challenge');

-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "original" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Correction" (
    "id" SERIAL NOT NULL,
    "sampleId" INTEGER NOT NULL,
    "wordIndex" INTEGER NOT NULL,
    "correct" TEXT[],
    "explanation" TEXT NOT NULL,

    CONSTRAINT "Correction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Correction" ADD CONSTRAINT "Correction_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
