/*
  Warnings:

  - You are about to drop the column `deliveredAt` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `purchasedAt` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "deliveredAt",
DROP COLUMN "purchasedAt";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "fullName" DROP NOT NULL;
