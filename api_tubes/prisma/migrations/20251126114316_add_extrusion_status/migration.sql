/*
  Warnings:

  - Added the required column `employee_id` to the `extrusion_operation_reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "extrusion_operation_reports" ADD COLUMN     "employee_id" INTEGER NOT NULL,
ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "extrusion_operation_reports" ADD CONSTRAINT "extrusion_operation_reports_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
