/*
  Warnings:

  - Added the required column `summary_id` to the `chief_technologist_notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chief_technologist_notes" ADD COLUMN     "summary_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "chief_technologist_notes" ADD CONSTRAINT "chief_technologist_notes_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summary_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;
