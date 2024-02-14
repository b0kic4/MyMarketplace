/*
  Warnings:

  - You are about to drop the `_productCarts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_productCarts" DROP CONSTRAINT "_productCarts_A_fkey";

-- DropForeignKey
ALTER TABLE "_productCarts" DROP CONSTRAINT "_productCarts_B_fkey";

-- DropIndex
DROP INDEX "Cart_productId_key";

-- DropIndex
DROP INDEX "Cart_userId_productId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cartId" INTEGER;

-- DropTable
DROP TABLE "_productCarts";

-- CreateTable
CREATE TABLE "CartProduct" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CartProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_cart_product" ON "CartProduct"("cartId", "productId");

-- CreateIndex
CREATE INDEX "idx_user_product" ON "Cart"("userId", "productId");

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
