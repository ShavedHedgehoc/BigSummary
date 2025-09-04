/*
  Warnings:

  - You are about to drop the column `name` on the `Station` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[position,line_id]` on the table `Station` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Station" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Station_position_line_id_key" ON "public"."Station"("position", "line_id");
