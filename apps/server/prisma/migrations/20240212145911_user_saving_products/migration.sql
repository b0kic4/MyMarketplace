-- CreateTable
CREATE TABLE "_savedProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_savedProducts_AB_unique" ON "_savedProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_savedProducts_B_index" ON "_savedProducts"("B");

-- AddForeignKey
ALTER TABLE "_savedProducts" ADD CONSTRAINT "_savedProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_savedProducts" ADD CONSTRAINT "_savedProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
