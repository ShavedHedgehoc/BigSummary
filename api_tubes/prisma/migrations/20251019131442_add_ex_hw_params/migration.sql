-- CreateTable
CREATE TABLE "Production" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "marking" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtrusionHardwareParams" (
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

    CONSTRAINT "ExtrusionHardwareParams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Production_code_key" ON "Production"("code");

-- AddForeignKey
ALTER TABLE "ExtrusionHardwareParams" ADD CONSTRAINT "ExtrusionHardwareParams_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;
