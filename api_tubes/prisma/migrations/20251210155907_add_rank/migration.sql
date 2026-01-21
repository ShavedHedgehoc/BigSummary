/*
  Warnings:

  - Made the column `rank_id` on table `employees` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_rank_id_fkey";

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "rank_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_rank_id_fkey" FOREIGN KEY ("rank_id") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
