/*
  Warnings:

  - Made the column `quantity` on table `OrderProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `OrderProduct` MODIFY `quantity` INTEGER NOT NULL;
