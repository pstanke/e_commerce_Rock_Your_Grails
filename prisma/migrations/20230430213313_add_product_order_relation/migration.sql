/*
  Warnings:

  - You are about to drop the `OrderedProduct` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderedProduct` DROP FOREIGN KEY `OrderedProduct_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderedProduct` DROP FOREIGN KEY `OrderedProduct_productId_fkey`;

-- AlterTable
ALTER TABLE `Order` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `note` VARCHAR(191) NULL,
    ADD COLUMN `orderId` VARCHAR(191) NULL,
    ADD COLUMN `quantity` INTEGER NULL;

-- DropTable
DROP TABLE `OrderedProduct`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
