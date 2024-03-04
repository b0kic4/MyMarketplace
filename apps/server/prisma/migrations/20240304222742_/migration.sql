/*
  Warnings:

  - You are about to drop the column `isPurchased` on the `CartProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "isPurchased" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CartProduct" DROP COLUMN "isPurchased";
