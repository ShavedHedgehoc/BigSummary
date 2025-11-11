/*
  Warnings:

  - You are about to drop the `Batch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Conveyor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExtrusionHardwareParamsRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExtrusionHardwareTresholdsRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Production` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Summary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExtrusionHardwareParamsRecord" DROP CONSTRAINT "ExtrusionHardwareParamsRecord_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "ExtrusionHardwareParamsRecord" DROP CONSTRAINT "ExtrusionHardwareParamsRecord_summary_id_fkey";

-- DropForeignKey
ALTER TABLE "ExtrusionHardwareTresholdsRecord" DROP CONSTRAINT "ExtrusionHardwareTresholdsRecord_production_id_fkey";

-- DropForeignKey
ALTER TABLE "Summary" DROP CONSTRAINT "Summary_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Summary" DROP CONSTRAINT "Summary_conveyor_id_fkey";

-- DropForeignKey
ALTER TABLE "Summary" DROP CONSTRAINT "Summary_production_id_fkey";

-- DropTable
DROP TABLE "Batch";

-- DropTable
DROP TABLE "Conveyor";

-- DropTable
DROP TABLE "ExtrusionHardwareParamsRecord";

-- DropTable
DROP TABLE "ExtrusionHardwareTresholdsRecord";

-- DropTable
DROP TABLE "Production";

-- DropTable
DROP TABLE "Summary";

-- CreateTable
CREATE TABLE "productions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "marking" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "productions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conveyors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "conveyors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batches" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summary_records" (
    "id" SERIAL NOT NULL,
    "production_id" INTEGER NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "conveyor_id" INTEGER NOT NULL,
    "plan" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "summary_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extrusion_hardware_tresholds_records" (
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

    CONSTRAINT "extrusion_hardware_tresholds_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extrusion_hardware_params_records" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "press_speed" INTEGER NOT NULL,
    "blow_time" INTEGER NOT NULL,
    "turning_machine_speed" INTEGER NOT NULL,
    "annealing_furnace_temp" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extrusion_hardware_params_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productions_code_key" ON "productions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "conveyors_name_key" ON "conveyors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "batches_name_key" ON "batches"("name");

-- AddForeignKey
ALTER TABLE "summary_records" ADD CONSTRAINT "summary_records_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summary_records" ADD CONSTRAINT "summary_records_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summary_records" ADD CONSTRAINT "summary_records_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_hardware_tresholds_records" ADD CONSTRAINT "extrusion_hardware_tresholds_records_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_hardware_params_records" ADD CONSTRAINT "extrusion_hardware_params_records_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summary_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_hardware_params_records" ADD CONSTRAINT "extrusion_hardware_params_records_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
