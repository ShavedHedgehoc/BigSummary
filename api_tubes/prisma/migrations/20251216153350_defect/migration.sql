/*
  Warnings:

  - You are about to drop the `defects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "defects" DROP CONSTRAINT "defects_summary_id_fkey";

-- DropTable
DROP TABLE "defects";

-- CreateTable
CREATE TABLE "extrusion_defects" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "extrusion_defects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extrusion_defects" ADD CONSTRAINT "extrusion_defects_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
