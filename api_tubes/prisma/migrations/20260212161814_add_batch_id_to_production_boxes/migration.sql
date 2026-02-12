/*
  Warnings:

  - Added the required column `batch_id` to the `production_boxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "production_boxes" ADD COLUMN     "batch_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "production_boxes" ADD CONSTRAINT "production_boxes_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
