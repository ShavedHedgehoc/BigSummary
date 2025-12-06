/*
  Warnings:

  - You are about to drop the column `value` on the `printers` table. All the data in the column will be lost.
  - Added the required column `ip` to the `printers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "printers" DROP COLUMN "value",
ADD COLUMN     "ip" TEXT NOT NULL;
