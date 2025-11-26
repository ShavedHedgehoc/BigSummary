-- CreateTable
CREATE TABLE "extrusion_operations" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "extrusion_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extrusion_operation_reports" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "operation_id" INTEGER,
    "idle" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extrusion_operation_reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extrusion_operation_reports" ADD CONSTRAINT "extrusion_operation_reports_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_operation_reports" ADD CONSTRAINT "extrusion_operation_reports_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "extrusion_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
