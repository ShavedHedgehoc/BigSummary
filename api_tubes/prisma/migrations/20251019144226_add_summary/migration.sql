/*
  Warnings:

  - You are about to drop the column `annealing_furnace_temp_max` on the `ExtrusionHardwareParamsRecord` table. All the data in the column will be lost.
  - You are about to drop the column `annealing_furnace_temp_min` on the `ExtrusionHardwareParamsRecord` table. All the data in the column will be lost.
  - You are about to drop the column `blow_time_max` on the `ExtrusionHardwareParamsRecord` table. All the data in the column will be lost.
  - You are about to drop the column `blow_time_min` on the `ExtrusionHardwareParamsRecord` table. All the data in the column will be lost.
  - You are about to drop the column `press_speed_max` on the `ExtrusionHardwareParamsRecord` table. All the data in the column will be lost.
  - You are about to drop the column `press_speed_min` on the `ExtrusionHardwareParamsRecord` table. All the data in the column will be lost.
  - You are about to drop the column `production_id` on the `ExtrusionHardwareParamsRecord` table. All the data in the column will be lost.
  - You are about to drop the column `turning_machine_speed_max` on the `ExtrusionHardwareParamsRecord` table. All the data in the column will be lost.
  - You are about to drop the column `turning_machine_speed_min` on the `ExtrusionHardwareParamsRecord` table. All the data in the column will be lost.
  - Added the required column `annealing_furnace_temp` to the `ExtrusionHardwareParamsRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blow_time` to the `ExtrusionHardwareParamsRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `ExtrusionHardwareParamsRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `press_speed` to the `ExtrusionHardwareParamsRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary_id` to the `ExtrusionHardwareParamsRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turning_machine_speed` to the `ExtrusionHardwareParamsRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ExtrusionHardwareParamsRecord" DROP CONSTRAINT "ExtrusionHardwareParamsRecord_production_id_fkey";

-- AlterTable
ALTER TABLE "ExtrusionHardwareParamsRecord" DROP COLUMN "annealing_furnace_temp_max",
DROP COLUMN "annealing_furnace_temp_min",
DROP COLUMN "blow_time_max",
DROP COLUMN "blow_time_min",
DROP COLUMN "press_speed_max",
DROP COLUMN "press_speed_min",
DROP COLUMN "production_id",
DROP COLUMN "turning_machine_speed_max",
DROP COLUMN "turning_machine_speed_min",
ADD COLUMN     "annealing_furnace_temp" INTEGER NOT NULL,
ADD COLUMN     "blow_time" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "employee_id" INTEGER NOT NULL,
ADD COLUMN     "press_speed" INTEGER NOT NULL,
ADD COLUMN     "summary_id" INTEGER NOT NULL,
ADD COLUMN     "turning_machine_speed" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Conveyor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Conveyor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Summary" (
    "id" SERIAL NOT NULL,
    "production_id" INTEGER NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "conveyor_id" INTEGER NOT NULL,
    "plan" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtrusionHardwareTresholdsRecord" (
    "id" SERIAL NOT NULL,
    "production_id" INTEGER NOT NULL,
    "press_speed_min" INTEGER NOT NULL,
    "press_speed_max" INTEGER NOT NULL,
    "blow_time_min" INTEGER NOT NULL,
    "blow_time_max" INTEGER NOT NULL,
    "turning_machine_speed_min" INTEGER NOT NULL,
    "turning_machine_speed_max" INTEGER NOT NULL,
    "annealing_furnace_temp_min" INTEGER NOT NULL,
    "annealing_furnace_temp_max" INTEGER NOT NULL,

    CONSTRAINT "ExtrusionHardwareTresholdsRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Conveyor_name_key" ON "Conveyor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_name_key" ON "Batch"("name");

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "Conveyor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtrusionHardwareTresholdsRecord" ADD CONSTRAINT "ExtrusionHardwareTresholdsRecord_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtrusionHardwareParamsRecord" ADD CONSTRAINT "ExtrusionHardwareParamsRecord_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "Summary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtrusionHardwareParamsRecord" ADD CONSTRAINT "ExtrusionHardwareParamsRecord_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
