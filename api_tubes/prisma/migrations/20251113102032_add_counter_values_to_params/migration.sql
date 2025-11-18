/*
  Warnings:

  - Added the required column `counter_value` to the `extrusion_hardware_params_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "extrusion_hardware_params_records" ADD COLUMN     "counter_value" INTEGER NOT NULL;
