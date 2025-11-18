/*
  Warnings:

  - You are about to drop the column `external_thread_value` on the `extrusion_tresholds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chief_technologist_notes" ADD COLUMN     "post_id" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "extrusion_tresholds" DROP COLUMN "external_thread_value";
