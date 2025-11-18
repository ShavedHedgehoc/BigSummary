/*
  Warnings:

  - You are about to alter the column `tube_diameter` on the `extrusion_quality_control_params_records` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `tube_cilindrical_section_thickness` on the `extrusion_quality_control_params_records` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `membrane_thickness_min` on the `extrusion_quality_control_tresholds_records` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `membrane_thickness_max` on the `extrusion_quality_control_tresholds_records` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `tube_diameter_min` on the `extrusion_quality_control_tresholds_records` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `tube_diameter_max` on the `extrusion_quality_control_tresholds_records` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `tube_cilindrical_section_thickness_min` on the `extrusion_quality_control_tresholds_records` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `tube_cilindrical_section_thickness_max` on the `extrusion_quality_control_tresholds_records` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "extrusion_quality_control_params_records" ALTER COLUMN "tube_diameter" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tube_cilindrical_section_thickness" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "extrusion_quality_control_tresholds_records" ALTER COLUMN "membrane_thickness_min" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "membrane_thickness_max" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tube_diameter_min" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tube_diameter_max" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tube_cilindrical_section_thickness_min" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tube_cilindrical_section_thickness_max" SET DATA TYPE DOUBLE PRECISION;
