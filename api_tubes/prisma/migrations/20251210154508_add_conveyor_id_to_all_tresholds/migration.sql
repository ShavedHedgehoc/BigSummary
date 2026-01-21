/*
  Warnings:

  - Added the required column `conveyor_id` to the `offset_tresholds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conveyor_id` to the `sealant_tresholds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conveyor_id` to the `varnish_tresholds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offset_tresholds" ADD COLUMN     "conveyor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sealant_tresholds" ADD COLUMN     "conveyor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "varnish_tresholds" ADD COLUMN     "conveyor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "varnish_tresholds" ADD CONSTRAINT "varnish_tresholds_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_tresholds" ADD CONSTRAINT "offset_tresholds_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_tresholds" ADD CONSTRAINT "sealant_tresholds_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
