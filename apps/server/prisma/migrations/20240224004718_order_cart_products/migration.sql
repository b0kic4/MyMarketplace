/*
  Warnings:

  - You are about to drop the column `OrderStatus` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderStatus` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "orderId" INTEGER;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "OrderStatus",
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
