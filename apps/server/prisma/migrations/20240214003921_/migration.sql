/*
  Warnings:

  - You are about to drop the column `purchaseStatus` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "purchaseStatus";

-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "purchaseStatus" "PurchaseStatus",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
