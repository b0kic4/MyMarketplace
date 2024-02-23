/*
  Warnings:

  - Made the column `purchaseStatus` on table `CartProduct` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `OrderStatus` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Succeed', 'Failed');

-- AlterTable
ALTER TABLE "CartProduct" ALTER COLUMN "purchaseStatus" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "OrderStatus" "OrderStatus" NOT NULL;
