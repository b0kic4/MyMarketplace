-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_productId_fkey";

-- CreateTable
CREATE TABLE "_productCarts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_productCarts_AB_unique" ON "_productCarts"("A", "B");

-- CreateIndex
CREATE INDEX "_productCarts_B_index" ON "_productCarts"("B");

-- AddForeignKey
ALTER TABLE "_productCarts" ADD CONSTRAINT "_productCarts_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productCarts" ADD CONSTRAINT "_productCarts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
