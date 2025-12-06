-- CreateTable
CREATE TABLE "production_boxes" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "production_boxes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "production_boxes" ADD CONSTRAINT "production_boxes_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_boxes" ADD CONSTRAINT "production_boxes_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
