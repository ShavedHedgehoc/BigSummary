-- AlterTable
ALTER TABLE "extrusion_operations" ADD COLUMN     "min_rank" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "offset_operations" ADD COLUMN     "min_rank" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "sealant_operations" ADD COLUMN     "min_rank" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "varnish_operations" ADD COLUMN     "min_rank" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "ranks" (
    "id" SERIAL NOT NULL,
    "val" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ranks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_ranks" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "rank_id" INTEGER NOT NULL,

    CONSTRAINT "employee_ranks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_ranks" ADD CONSTRAINT "employee_ranks_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_ranks" ADD CONSTRAINT "employee_ranks_rank_id_fkey" FOREIGN KEY ("rank_id") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
