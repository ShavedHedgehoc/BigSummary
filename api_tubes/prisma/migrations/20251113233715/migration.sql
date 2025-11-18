/*
  Warnings:

  - You are about to alter the column `membrane_thickness` on the `extrusion_quality_control_params_records` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,4)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "extrusion_quality_control_params_records" ALTER COLUMN "membrane_thickness" SET DATA TYPE DOUBLE PRECISION;
