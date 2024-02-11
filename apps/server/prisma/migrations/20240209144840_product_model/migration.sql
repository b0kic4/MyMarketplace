/*
  Warnings:

  - You are about to drop the column `adjective` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryType` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isChecked` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingInformation` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `texture` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "adjective",
DROP COLUMN "category",
DROP COLUMN "imageUrl",
DROP COLUMN "isbn",
DROP COLUMN "name",
ADD COLUMN     "categoryType" TEXT NOT NULL,
ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isChecked" BOOLEAN NOT NULL,
ADD COLUMN     "shippingInformation" TEXT NOT NULL,
ADD COLUMN     "sizes" TEXT[],
ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "texture" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
