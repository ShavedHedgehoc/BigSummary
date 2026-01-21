-- AlterTable
ALTER TABLE "offset_statuses" ALTER COLUMN "employee_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sealant_statuses" ALTER COLUMN "employee_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "varnish_statuses" ALTER COLUMN "employee_id" DROP NOT NULL;
