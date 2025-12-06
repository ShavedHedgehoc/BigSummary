/*
  Warnings:

  - You are about to drop the `printer_api` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "printer_api" DROP CONSTRAINT "printer_api_conveyor_id_fkey";

-- DropTable
DROP TABLE "printer_api";

-- CreateTable
CREATE TABLE "printers" (
    "id" SERIAL NOT NULL,
    "conveyor_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "port" INTEGER NOT NULL,

    CONSTRAINT "printers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "printers_conveyor_id_key" ON "printers"("conveyor_id");

-- AddForeignKey
ALTER TABLE "printers" ADD CONSTRAINT "printers_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
