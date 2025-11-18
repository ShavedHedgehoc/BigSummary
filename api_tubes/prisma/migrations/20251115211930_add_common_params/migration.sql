-- CreateTable
CREATE TABLE "extrusion_params" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "counter_value" INTEGER NOT NULL,
    "press_speed" INTEGER NOT NULL,
    "blow_time" INTEGER NOT NULL,
    "turning_machine_speed" INTEGER NOT NULL,
    "annealing_furnace_temp" INTEGER NOT NULL,
    "rondel_type_id" INTEGER NOT NULL,
    "tube_cilindrical_section_length" INTEGER NOT NULL,
    "membrane_thickness" DOUBLE PRECISION NOT NULL,
    "tube_diameter" DOUBLE PRECISION NOT NULL,
    "tube_cilindrical_section_thickness" DOUBLE PRECISION NOT NULL,
    "tube_rigidity" INTEGER NOT NULL,
    "tube_cutting_quality" BOOLEAN NOT NULL DEFAULT false,
    "tightness" BOOLEAN NOT NULL DEFAULT false,
    "external_thread_quality" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extrusion_params_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extrusion_params" ADD CONSTRAINT "extrusion_params_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summary_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_params" ADD CONSTRAINT "extrusion_params_rondel_type_id_fkey" FOREIGN KEY ("rondel_type_id") REFERENCES "rondel_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_params" ADD CONSTRAINT "extrusion_params_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
