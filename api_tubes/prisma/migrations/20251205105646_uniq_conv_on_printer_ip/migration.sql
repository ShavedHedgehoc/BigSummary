/*
  Warnings:

  - A unique constraint covering the columns `[conveyor_id]` on the table `printer_api` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "printer_api_conveyor_id_key" ON "printer_api"("conveyor_id");
