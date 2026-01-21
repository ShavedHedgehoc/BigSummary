/*
  Warnings:

  - Added the required column `conveyor_id` to the `extrusion_tresholds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "extrusion_tresholds" ADD COLUMN     "conveyor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "extrusion_tresholds" ADD CONSTRAINT "extrusion_tresholds_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
