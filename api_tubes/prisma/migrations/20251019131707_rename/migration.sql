/*
  Warnings:

  - You are about to drop the `ExtrusionHardwareParams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ExtrusionHardwareParams" DROP CONSTRAINT "ExtrusionHardwareParams_production_id_fkey";

-- DropTable
DROP TABLE "public"."ExtrusionHardwareParams";

-- CreateTable
CREATE TABLE "ExtrusionHardwareParamsRecord" (
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

    CONSTRAINT "ExtrusionHardwareParamsRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExtrusionHardwareParamsRecord" ADD CONSTRAINT "ExtrusionHardwareParamsRecord_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;
