-- CreateTable
CREATE TABLE "summary_raw_current_materials" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "raw_material_id" INTEGER NOT NULL,
    "lot" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "summary_raw_current_materials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "summary_raw_current_materials" ADD CONSTRAINT "summary_raw_current_materials_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summary_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summary_raw_current_materials" ADD CONSTRAINT "summary_raw_current_materials_raw_material_id_fkey" FOREIGN KEY ("raw_material_id") REFERENCES "raw_materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summary_raw_current_materials" ADD CONSTRAINT "summary_raw_current_materials_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
