-- CreateTable
CREATE TABLE "varnish_operations" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "varnish_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "varnish_statuses" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "operation_id" INTEGER,
    "idle" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "varnish_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offset_operations" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "offset_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offset_statuses" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "operation_id" INTEGER,
    "idle" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offset_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sealant_operations" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "sealant_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sealant_statuses" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "operation_id" INTEGER,
    "idle" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sealant_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "varnish_statuses" ADD CONSTRAINT "varnish_statuses_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "varnish_statuses" ADD CONSTRAINT "varnish_statuses_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "varnish_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "varnish_statuses" ADD CONSTRAINT "varnish_statuses_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_statuses" ADD CONSTRAINT "offset_statuses_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_statuses" ADD CONSTRAINT "offset_statuses_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "offset_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_statuses" ADD CONSTRAINT "offset_statuses_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_statuses" ADD CONSTRAINT "sealant_statuses_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_statuses" ADD CONSTRAINT "sealant_statuses_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "sealant_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_statuses" ADD CONSTRAINT "sealant_statuses_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
