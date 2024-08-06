/*
  Warnings:

  - You are about to drop the column `carId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `File` table. All the data in the column will be lost.
  - Added the required column `originalname` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_carId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "carId",
DROP COLUMN "size",
DROP COLUMN "url",
ADD COLUMN     "originalname" TEXT NOT NULL;
