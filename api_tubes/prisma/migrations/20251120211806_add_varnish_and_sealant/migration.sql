-- AlterTable
ALTER TABLE "extrusion_tresholds" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "offset_tresholds" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "varnish_params" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "counter_value" INTEGER NOT NULL,
    "varnish_machine_speed" INTEGER NOT NULL,
    "total_air_pressure" DOUBLE PRECISION NOT NULL,
    "feed_can_air_pressure" DOUBLE PRECISION NOT NULL,
    "nozzle_regulator_air_pressure" DOUBLE PRECISION NOT NULL,
    "cells_speed" INTEGER NOT NULL,
    "injection_a_start_position" INTEGER NOT NULL,
    "injection_b_start_position" INTEGER NOT NULL,
    "injection_c_start_position" INTEGER NOT NULL,
    "injection_d_start_position" INTEGER NOT NULL,
    "injection_a_end_position" INTEGER NOT NULL,
    "injection_b_end_position" INTEGER NOT NULL,
    "injection_c_end_position" INTEGER NOT NULL,
    "injection_d_end_position" INTEGER NOT NULL,
    "tube_molding_start_position" INTEGER NOT NULL,
    "tube_molding_end_position" INTEGER NOT NULL,
    "polimerization_furnace_temp" INTEGER NOT NULL,
    "internal_varnish_porosity" DOUBLE PRECISION NOT NULL,
    "internal_sectional_view" BOOLEAN NOT NULL,
    "aluminium_clearance_lack" BOOLEAN NOT NULL,
    "unpainting_lack" BOOLEAN NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "varnish_params_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "varnish_tresholds" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "varnish_machine_speed_min" INTEGER NOT NULL,
    "varnish_machine_speed_max" INTEGER NOT NULL,
    "total_air_pressure_min" DOUBLE PRECISION NOT NULL,
    "total_air_pressure_max" DOUBLE PRECISION NOT NULL,
    "feed_can_air_pressure_min" DOUBLE PRECISION NOT NULL,
    "feed_can_air_pressure_max" DOUBLE PRECISION NOT NULL,
    "nozzle_regulator_air_pressure_min" DOUBLE PRECISION NOT NULL,
    "nozzle_regulator_air_pressure_max" DOUBLE PRECISION NOT NULL,
    "cells_speed_min" INTEGER NOT NULL,
    "cells_speed_max" INTEGER NOT NULL,
    "injection_a_start_position_min" INTEGER NOT NULL,
    "injection_a_start_position_max" INTEGER NOT NULL,
    "injection_b_start_position_min" INTEGER NOT NULL,
    "injection_b_start_position_max" INTEGER NOT NULL,
    "injection_c_start_position_min" INTEGER NOT NULL,
    "injection_c_start_position_max" INTEGER NOT NULL,
    "injection_d_start_position_min" INTEGER NOT NULL,
    "injection_d_start_position_max" INTEGER NOT NULL,
    "injection_a_end_position_min" INTEGER NOT NULL,
    "injection_a_end_position_max" INTEGER NOT NULL,
    "injection_b_end_position_min" INTEGER NOT NULL,
    "injection_b_end_position_max" INTEGER NOT NULL,
    "injection_c_end_position_min" INTEGER NOT NULL,
    "injection_c_end_position_max" INTEGER NOT NULL,
    "injection_d_end_position_min" INTEGER NOT NULL,
    "injection_d_end_position_max" INTEGER NOT NULL,
    "tube_molding_start_position_min" INTEGER NOT NULL,
    "tube_molding_start_position_max" INTEGER NOT NULL,
    "tube_molding_end_position_min" INTEGER NOT NULL,
    "tube_molding_end_position_max" INTEGER NOT NULL,
    "polimerization_furnace_temp_min" INTEGER NOT NULL,
    "polimerization_furnace_temp_max" INTEGER NOT NULL,
    "internal_varnish_porosity_min" DOUBLE PRECISION NOT NULL,
    "internal_varnish_porosity_max" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "varnish_tresholds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sealant_params" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "counter_value" INTEGER NOT NULL,
    "cap_machine_speed" INTEGER NOT NULL,
    "total_air_pressure" DOUBLE PRECISION NOT NULL,
    "holders_forward" INTEGER NOT NULL,
    "holders_opening_left" INTEGER NOT NULL,
    "holders_opening_right" INTEGER NOT NULL,
    "holders_closing" INTEGER NOT NULL,
    "injection_a_start" INTEGER NOT NULL,
    "injection_b_start" INTEGER NOT NULL,
    "injection_a_end" INTEGER NOT NULL,
    "injection_b_end" INTEGER NOT NULL,
    "injection_tube_orientation_start" INTEGER NOT NULL,
    "injection_tube_orientation_end" INTEGER NOT NULL,
    "is_cap_surface_smooth" BOOLEAN NOT NULL,
    "latex_ring_padding" INTEGER NOT NULL,
    "latex_ring_width" INTEGER NOT NULL,
    "tube_rigidity" INTEGER NOT NULL,
    "cap_unscrewing_torque" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sealant_params_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sealant_tresholds" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "cap_machine_speed_min" INTEGER NOT NULL,
    "cap_machine_speed_max" INTEGER NOT NULL,
    "total_air_pressure_min" DOUBLE PRECISION NOT NULL,
    "total_air_pressure_max" DOUBLE PRECISION NOT NULL,
    "holders_forward_min" INTEGER NOT NULL,
    "holders_forward_max" INTEGER NOT NULL,
    "holders_opening_left_min" INTEGER NOT NULL,
    "holders_opening_left_max" INTEGER NOT NULL,
    "holders_opening_right_min" INTEGER NOT NULL,
    "holders_opening_right_max" INTEGER NOT NULL,
    "holders_closing_min" INTEGER NOT NULL,
    "holders_closing_max" INTEGER NOT NULL,
    "injection_a_start_min" INTEGER NOT NULL,
    "injection_a_start_max" INTEGER NOT NULL,
    "injection_b_start_min" INTEGER NOT NULL,
    "injection_b_start_max" INTEGER NOT NULL,
    "injection_a_end_min" INTEGER NOT NULL,
    "injection_a_end_max" INTEGER NOT NULL,
    "injection_b_end_min" INTEGER NOT NULL,
    "injection_b_end_max" INTEGER NOT NULL,
    "injection_tube_orientation_start_min" INTEGER NOT NULL,
    "injection_tube_orientation_start_max" INTEGER NOT NULL,
    "injection_tube_orientation_end_min" INTEGER NOT NULL,
    "injection_tube_orientation_end_max" INTEGER NOT NULL,
    "latex_ring_padding_min" INTEGER NOT NULL,
    "latex_ring_padding_max" INTEGER NOT NULL,
    "latex_ring_width_min" INTEGER NOT NULL,
    "latex_ring_width_max" INTEGER NOT NULL,
    "tube_rigidity_min" INTEGER NOT NULL,
    "tube_rigidity_max" INTEGER NOT NULL,
    "cap_unscrewing_torque_min" INTEGER NOT NULL,
    "cap_unscrewing_torque_max" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sealant_tresholds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "varnish_params" ADD CONSTRAINT "varnish_params_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "varnish_params" ADD CONSTRAINT "varnish_params_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "varnish_tresholds" ADD CONSTRAINT "varnish_tresholds_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_params" ADD CONSTRAINT "sealant_params_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_params" ADD CONSTRAINT "sealant_params_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sealant_tresholds" ADD CONSTRAINT "sealant_tresholds_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
