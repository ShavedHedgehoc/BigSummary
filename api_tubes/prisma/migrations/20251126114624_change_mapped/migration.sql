/*
  Warnings:

  - You are about to drop the `extrusion_operation_reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "extrusion_operation_reports" DROP CONSTRAINT "extrusion_operation_reports_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_operation_reports" DROP CONSTRAINT "extrusion_operation_reports_operation_id_fkey";

-- DropForeignKey
ALTER TABLE "extrusion_operation_reports" DROP CONSTRAINT "extrusion_operation_reports_summary_id_fkey";

-- DropTable
DROP TABLE "extrusion_operation_reports";

-- CreateTable
CREATE TABLE "extrusion_statuses" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "operation_id" INTEGER,
    "idle" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extrusion_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extrusion_statuses" ADD CONSTRAINT "extrusion_statuses_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_statuses" ADD CONSTRAINT "extrusion_statuses_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "extrusion_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_statuses" ADD CONSTRAINT "extrusion_statuses_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
