-- CreateTable
CREATE TABLE "extrusion_tresholds" (
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
    "rondel_type_id" INTEGER NOT NULL,
    "tube_cilindrical_section_length_min" INTEGER NOT NULL,
    "tube_cilindrical_section_length_max" INTEGER NOT NULL,
    "membrane_thickness_min" DOUBLE PRECISION NOT NULL,
    "membrane_thickness_max" DOUBLE PRECISION NOT NULL,
    "tube_diameter_min" DOUBLE PRECISION NOT NULL,
    "tube_diameter_max" DOUBLE PRECISION NOT NULL,
    "tube_cilindrical_section_thickness_min" DOUBLE PRECISION NOT NULL,
    "tube_cilindrical_section_thickness_max" DOUBLE PRECISION NOT NULL,
    "tube_rigidity_min" INTEGER NOT NULL,
    "tube_rigidity_max" INTEGER NOT NULL,
    "external_thread_value" TEXT NOT NULL,

    CONSTRAINT "extrusion_tresholds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extrusion_tresholds" ADD CONSTRAINT "extrusion_tresholds_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "productions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_tresholds" ADD CONSTRAINT "extrusion_tresholds_rondel_type_id_fkey" FOREIGN KEY ("rondel_type_id") REFERENCES "rondel_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
