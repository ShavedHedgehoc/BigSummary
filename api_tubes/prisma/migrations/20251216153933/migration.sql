/*
  Warnings:

  - A unique constraint covering the columns `[summary_id]` on the table `extrusion_defects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "extrusion_defects_summary_id_key" ON "extrusion_defects"("summary_id");
