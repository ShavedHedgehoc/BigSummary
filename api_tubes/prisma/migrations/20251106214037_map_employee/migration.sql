/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExtrusionHardwareParamsRecord" DROP CONSTRAINT "ExtrusionHardwareParamsRecord_employee_id_fkey";

-- DropTable
DROP TABLE "Employee";

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_barcode_key" ON "employees"("barcode");

-- AddForeignKey
ALTER TABLE "ExtrusionHardwareParamsRecord" ADD CONSTRAINT "ExtrusionHardwareParamsRecord_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
