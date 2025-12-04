/*
  Warnings:

  - Added the required column `counter_value` to the `offset_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `counter_value` to the `sealant_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `counter_value` to the `varnish_statuses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offset_statuses" ADD COLUMN     "counter_value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sealant_statuses" ADD COLUMN     "counter_value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "varnish_statuses" ADD COLUMN     "counter_value" INTEGER NOT NULL;
