/*
  Warnings:

  - You are about to drop the column `purchaseStatus` on the `CartProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartProduct" DROP COLUMN "purchaseStatus";

-- DropEnum
DROP TYPE "PurchaseStatus";
