/*
  Warnings:

  - You are about to drop the column `number` on the `production_boxes` table. All the data in the column will be lost.
  - Added the required column `box_number` to the `production_boxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "production_boxes" DROP COLUMN "number",
ADD COLUMN     "box_number" INTEGER NOT NULL;
