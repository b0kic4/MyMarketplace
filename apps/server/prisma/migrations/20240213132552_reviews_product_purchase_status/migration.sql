-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('NotPurchased', 'Purchased', 'Delivering', 'Delivered');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "purchaseStatus" "PurchaseStatus";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
