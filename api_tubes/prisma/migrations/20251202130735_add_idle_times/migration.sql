/*
  Warnings:

  - You are about to alter the column `idle_time` on the `extrusion_statuses` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "extrusion_statuses" ALTER COLUMN "idle_time" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "offset_statuses" ADD COLUMN     "idle_time" INTEGER;

-- AlterTable
ALTER TABLE "sealant_statuses" ADD COLUMN     "idle_time" INTEGER;

-- AlterTable
ALTER TABLE "varnish_statuses" ADD COLUMN     "idle_time" INTEGER;
