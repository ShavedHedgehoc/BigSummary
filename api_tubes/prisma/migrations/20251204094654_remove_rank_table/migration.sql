/*
  Warnings:

  - You are about to drop the `employee_ranks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "employee_ranks" DROP CONSTRAINT "employee_ranks_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_ranks" DROP CONSTRAINT "employee_ranks_rank_id_fkey";

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "rank_id" INTEGER;

-- DropTable
DROP TABLE "employee_ranks";

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_rank_id_fkey" FOREIGN KEY ("rank_id") REFERENCES "ranks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
