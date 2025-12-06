/*
  Warnings:

  - Added the required column `number` to the `production_boxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "production_boxes" ADD COLUMN     "number" INTEGER NOT NULL;
