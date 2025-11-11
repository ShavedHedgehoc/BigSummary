/*
  Warnings:

  - Added the required column `rondel_type_id` to the `extrusion_hardware_tresholds_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "extrusion_hardware_tresholds_records" ADD COLUMN     "rondel_type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "rondel_type" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "rondel_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extrusion_hardware_tresholds_records" ADD CONSTRAINT "extrusion_hardware_tresholds_records_rondel_type_id_fkey" FOREIGN KEY ("rondel_type_id") REFERENCES "rondel_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
