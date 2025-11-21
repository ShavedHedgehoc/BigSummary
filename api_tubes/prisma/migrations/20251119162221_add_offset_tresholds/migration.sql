-- CreateTable
CREATE TABLE "offset_params" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "counter_value" INTEGER NOT NULL,
    "printing_machine_speed" INTEGER NOT NULL,
    "total_air_pressure" INTEGER NOT NULL,
    "padding_furnace_temp" INTEGER NOT NULL,
    "offset_furnace_temp" INTEGER NOT NULL,
    "printer_motor" INTEGER NOT NULL,
    "base_covers_holders_motor" INTEGER NOT NULL,
    "base_covers_station_motor" INTEGER NOT NULL,
    "imprint_quantity_printed_box_1" INTEGER,
    "imprint_quantity_printed_box_2" INTEGER,
    "imprint_quantity_printed_box_3" INTEGER,
    "imprint_quantity_printed_box_4" INTEGER,
    "imprint_quantity_printed_box_5" INTEGER,
    "imprint_quantity_printed_box_6" INTEGER,
    "ink_supply_time" DOUBLE PRECISION NOT NULL,
    "design_match" BOOLEAN NOT NULL DEFAULT false,
    "tube_apperarance" BOOLEAN NOT NULL DEFAULT false,
    "tube_edge_deformation_lack" BOOLEAN NOT NULL DEFAULT false,
    "aluminium_clearance_lack" BOOLEAN NOT NULL DEFAULT false,
    "drips_lack" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "offset_params_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offset_tresholds" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "printing_machine_speed_min" INTEGER NOT NULL,
    "printing_machine_speed_max" INTEGER NOT NULL,
    "total_air_pressure_min" INTEGER NOT NULL,
    "total_air_pressure_max" INTEGER NOT NULL,
    "padding_furnace_temp_min" INTEGER NOT NULL,
    "padding_furnace_temp_max" INTEGER NOT NULL,
    "offset_furnace_temp_min" INTEGER NOT NULL,
    "offset_furnace_temp_max" INTEGER NOT NULL,
    "printer_motor_min" INTEGER NOT NULL,
    "printer_motor_max" INTEGER NOT NULL,
    "base_covers_holders_motor_min" INTEGER NOT NULL,
    "base_covers_holders_motor_max" INTEGER NOT NULL,
    "base_covers_station_motor_min" INTEGER NOT NULL,
    "base_covers_station_motor_max" INTEGER NOT NULL,
    "imprint_quantity_printed_box_1_min" INTEGER,
    "imprint_quantity_printed_box_1_max" INTEGER,
    "imprint_quantity_printed_box_2_min" INTEGER,
    "imprint_quantity_printed_box_2_max" INTEGER,
    "imprint_quantity_printed_box_3_min" INTEGER,
    "imprint_quantity_printed_box_3_max" INTEGER,
    "imprint_quantity_printed_box_4_min" INTEGER,
    "imprint_quantity_printed_box_4_max" INTEGER,
    "imprint_quantity_printed_box_5_min" INTEGER,
    "imprint_quantity_printed_box_5_max" INTEGER,
    "imprint_quantity_printed_box_6_min" INTEGER,
    "imprint_quantity_printed_box_6_max" INTEGER,
    "ink_supply_time_min" DOUBLE PRECISION NOT NULL,
    "ink_supply_time_max" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "offset_tresholds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offset_params" ADD CONSTRAINT "offset_params_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_params" ADD CONSTRAINT "offset_params_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offset_tresholds" ADD CONSTRAINT "offset_tresholds_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
