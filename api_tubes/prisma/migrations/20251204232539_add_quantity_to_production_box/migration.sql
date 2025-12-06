/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `production_boxes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `production_boxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "production_boxes" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "production_boxes_uuid_key" ON "production_boxes"("uuid");
