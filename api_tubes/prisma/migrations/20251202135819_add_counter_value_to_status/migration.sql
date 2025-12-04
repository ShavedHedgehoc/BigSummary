/*
  Warnings:

  - Added the required column `counter_value` to the `extrusion_statuses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "extrusion_statuses" ADD COLUMN     "counter_value" INTEGER NOT NULL;
