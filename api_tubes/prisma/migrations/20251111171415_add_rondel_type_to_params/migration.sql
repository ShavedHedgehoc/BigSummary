/*
  Warnings:

  - Added the required column `rondel_type_id` to the `extrusion_hardware_params_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "extrusion_hardware_params_records" ADD COLUMN     "rondel_type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "extrusion_hardware_params_records" ADD CONSTRAINT "extrusion_hardware_params_records_rondel_type_id_fkey" FOREIGN KEY ("rondel_type_id") REFERENCES "rondel_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
