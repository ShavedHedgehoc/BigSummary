-- CreateTable
CREATE TABLE "api_errors" (
    "id" SERIAL NOT NULL,
    "dto" VARCHAR(255),
    "message" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "api_errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apparatuses" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "apparatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bases" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "marking" VARCHAR(255),

    CONSTRAINT "bases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boils" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "base_id" INTEGER,
    "letter" VARCHAR(255),
    "year" DECIMAL,
    "number" DECIMAL,
    "plant_id" INTEGER,

    CONSTRAINT "boils_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cans" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "cans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conveyors" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "barcode" VARCHAR(13),

    CONSTRAINT "conveyors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "docs" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "barcode" VARCHAR(255) NOT NULL,
    "occupationId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "histories" (
    "id" SERIAL NOT NULL,
    "record_id" INTEGER,
    "boil_id" INTEGER,
    "historyTypeId" INTEGER,
    "userId" INTEGER,
    "employeeId" INTEGER,
    "note" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "note_id" INTEGER,
    "plant_id" INTEGER,

    CONSTRAINT "histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_types" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "for_boil" BOOLEAN,

    CONSTRAINT "history_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marking_sample" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "marking_sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255),

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occupations" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "occupations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plants" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "abb" VARCHAR(10),

    CONSTRAINT "plants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "code1C" VARCHAR(255) NOT NULL,
    "marking" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "serieId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_counters" (
    "id" SERIAL NOT NULL,
    "record_id" INTEGER,
    "task_uid" VARCHAR(255),
    "counter_value" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "record_counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_regulations" (
    "id" SERIAL NOT NULL,
    "record_id" INTEGER,
    "org_base_min_weight" DECIMAL,
    "org_base_max_weight" DECIMAL,
    "water_base_min_weight" DECIMAL,
    "water_base_max_weight" DECIMAL,
    "per_box" INTEGER,
    "box_per_row" INTEGER,
    "row_on_pallet" INTEGER,
    "gasket" VARCHAR(255),
    "seal" BOOLEAN,
    "technician_note" VARCHAR(255),
    "packaging_note" VARCHAR(255),
    "marking_sample_id" INTEGER,
    "inc_color" VARCHAR(255),
    "marking_feature" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "record_regulations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "id" SERIAL NOT NULL,
    "doc_id" INTEGER,
    "productId" INTEGER,
    "boilId" INTEGER,
    "apparatusId" INTEGER,
    "canId" INTEGER,
    "conveyorId" INTEGER,
    "plan" INTEGER NOT NULL,
    "bbf" VARCHAR(255) NOT NULL,
    "note" VARCHAR(1024) NOT NULL,
    "workshopId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "isSet" BOOLEAN,
    "organic_base_id" INTEGER,
    "water_base_id" INTEGER,
    "dm" VARCHAR(48) NOT NULL DEFAULT '-',

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regulations" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "water_base_min_weight" DECIMAL,
    "water_base_max_weight" DECIMAL,
    "per_box" INTEGER,
    "box_per_row" INTEGER,
    "row_on_pallet" INTEGER,
    "gasket" VARCHAR(255),
    "seal" BOOLEAN,
    "technician_note" VARCHAR(255),
    "packaging_note" VARCHAR(255),
    "marking_sample_id" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "regulations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semi_products" (
    "id" SERIAL NOT NULL,
    "record_id" INTEGER,
    "product_id" INTEGER,
    "boil_id" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "semi_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "token" VARCHAR(3000) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_assembly" (
    "id" SERIAL NOT NULL,
    "tube_record_id" INTEGER,
    "tube_material_id" INTEGER,
    "tube_conveyor_post_id" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tube_assembly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_conveyor_posts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tube_conveyor_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_conveyors" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "barcode" VARCHAR(255),

    CONSTRAINT "tube_conveyors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_histories" (
    "id" SERIAL NOT NULL,
    "tube_record_id" INTEGER,
    "tube_history_type_id" INTEGER,
    "employee_id" INTEGER,
    "note" VARCHAR(255),
    "tube_history_note_id" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tube_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_histories_notes" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255),

    CONSTRAINT "tube_histories_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_history_types" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "tube_history_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_materials" (
    "id" SERIAL NOT NULL,
    "code_1C" VARCHAR(255),
    "name" VARCHAR(255),

    CONSTRAINT "tube_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_parameters" (
    "id" SERIAL NOT NULL,
    "tube_record_id" INTEGER,
    "press_speed_min" INTEGER,
    "press_speed_max" INTEGER,
    "molding_time_min" INTEGER,
    "molding_time_max" INTEGER,
    "turning_automate_speed_min" INTEGER,
    "turning_automate_speed_max" INTEGER,
    "annealing_furnace_temp_min" INTEGER,
    "annealing_furnace_temp_max" INTEGER,
    "cap_machine_speed_min" INTEGER,
    "cap_machine_speed_max" INTEGER,
    "caps_machine_air_pressure_min" DOUBLE PRECISION,
    "caps_machine_air_pressure_max" DOUBLE PRECISION,
    "grips_forward_min" INTEGER,
    "grips_forward_max" INTEGER,
    "grips_opening_left_min" INTEGER,
    "grips_opening_left_max" INTEGER,
    "grips_opening_right_min" INTEGER,
    "grips_opening_right_max" INTEGER,
    "grips_closing_min" INTEGER,
    "grips_closing_max" INTEGER,
    "injection_start_min" INTEGER,
    "injection_start_max" INTEGER,
    "injection_end_min" INTEGER,
    "injection_end_max" INTEGER,
    "tube_start_position_min" INTEGER,
    "tube_start_position_max" INTEGER,
    "tube_end_position_min" INTEGER,
    "tube_end_position_max" INTEGER,
    "padding_machine_speed_min" INTEGER,
    "padding_machine_speed_max" INTEGER,
    "padding_machine_air_pressure_min" DOUBLE PRECISION,
    "padding_machine_air_pressure_max" DOUBLE PRECISION,
    "padding_furnace_temp_min" INTEGER,
    "padding_furnace_temp_max" INTEGER,
    "offset_furnace_temp_min" INTEGER,
    "offset_furnace_temp_max" INTEGER,
    "printer_motor_speed_min" INTEGER,
    "printer_motor_speed_max" INTEGER,
    "holders_motor_speed_min" INTEGER,
    "holders_motor_speed_max" INTEGER,
    "station_motor_speed_min" INTEGER,
    "station_motor_speed_max" INTEGER,
    "ink_injection_time_min" INTEGER,
    "ink_injection_time_max" INTEGER,
    "lacquer_machine_speed_min" INTEGER,
    "lacquer_machine_speed_max" INTEGER,
    "lacquer_machine_air_pressure_min" DOUBLE PRECISION,
    "lacquer_machine_air_pressure_max" DOUBLE PRECISION,
    "feed_can_air_pressure_min" DOUBLE PRECISION,
    "feed_can_air_pressure_max" DOUBLE PRECISION,
    "nozzle_regulator_air_pressure_min" DOUBLE PRECISION,
    "nozzle_regulator_air_pressure_max" DOUBLE PRECISION,
    "cells_speed_min" INTEGER,
    "cells_speed_max" INTEGER,
    "injection_start_position_min" INTEGER,
    "injection_start_position_max" INTEGER,
    "injection_end_position_min" INTEGER,
    "injection_end_position_max" INTEGER,
    "tube_molding_start_position_min" INTEGER,
    "tube_molding_start_position_max" INTEGER,
    "tube_molding_end_position_min" INTEGER,
    "tube_molding_end_position_max" INTEGER,
    "polimerrization_furnace_temperature_min" INTEGER,
    "polimerrization_furnace_temperature_max" INTEGER,

    CONSTRAINT "tube_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_products" (
    "id" SERIAL NOT NULL,
    "code_1C" VARCHAR(255),
    "marking" VARCHAR(255),
    "name" VARCHAR(255),

    CONSTRAINT "tube_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_records" (
    "id" SERIAL NOT NULL,
    "tube_product_id" INTEGER,
    "tube_conveyor_id" INTEGER,
    "boil_id" INTEGER,
    "plan" INTEGER NOT NULL,
    "start_date" DATE,
    "finished" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tube_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_sessions" (
    "id" SERIAL NOT NULL,
    "conveyor_id" INTEGER,
    "employee_id" INTEGER,
    "finished" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tube_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tube_specifications" (
    "id" SERIAL NOT NULL,
    "tube_product_id" INTEGER,
    "tube_material_id" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tube_specifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "plant_id" INTEGER,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "banned" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workshops" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255) NOT NULL,

    CONSTRAINT "workshops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apparatuses_value_key" ON "apparatuses"("value");

-- CreateIndex
CREATE UNIQUE INDEX "bases_code_key" ON "bases"("code");

-- CreateIndex
CREATE UNIQUE INDEX "boils_value_key" ON "boils"("value");

-- CreateIndex
CREATE INDEX "boils_plant_id_year_letter_number_id_value_base_id_idx" ON "boils"("plant_id", "year" DESC, "letter" DESC, "number" DESC, "id", "value", "base_id");

-- CreateIndex
CREATE INDEX "idx_boils_base_id" ON "boils"("base_id");

-- CreateIndex
CREATE INDEX "idx_boils_plant_id" ON "boils"("plant_id");

-- CreateIndex
CREATE UNIQUE INDEX "cans_value_key" ON "cans"("value");

-- CreateIndex
CREATE UNIQUE INDEX "conveyors_value_key" ON "conveyors"("value");

-- CreateIndex
CREATE INDEX "idx_docs_plantid" ON "docs"("plantId");

-- CreateIndex
CREATE INDEX "idx_docs_plantid_date" ON "docs"("plantId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "employees_name_key" ON "employees"("name");

-- CreateIndex
CREATE UNIQUE INDEX "employees_barcode_key" ON "employees"("barcode");

-- CreateIndex
CREATE INDEX "idx_hist_record_createdat" ON "histories"("record_id", "createdAt");

-- CreateIndex
CREATE INDEX "idx_histories_boil_createdat_include" ON "histories"("boil_id", "createdAt", "id", "record_id", "historyTypeId", "userId", "employeeId", "note", "note_id", "plant_id", "updatedAt");

-- CreateIndex
CREATE INDEX "idx_histories_boil_id" ON "histories"("boil_id");

-- CreateIndex
CREATE INDEX "idx_histories_employee_id" ON "histories"("employeeId");

-- CreateIndex
CREATE INDEX "idx_histories_history_type_id" ON "histories"("historyTypeId");

-- CreateIndex
CREATE INDEX "idx_histories_note_id" ON "histories"("note_id");

-- CreateIndex
CREATE INDEX "idx_histories_plant_id" ON "histories"("plant_id");

-- CreateIndex
CREATE INDEX "idx_histories_record_createdat" ON "histories"("record_id", "createdAt");

-- CreateIndex
CREATE INDEX "idx_histories_record_id" ON "histories"("record_id");

-- CreateIndex
CREATE INDEX "idx_histories_recordid_createdat" ON "histories"("record_id", "createdAt", "id", "boil_id", "historyTypeId", "userId", "employeeId", "note_id", "plant_id", "updatedAt");

-- CreateIndex
CREATE INDEX "idx_histories_user_id" ON "histories"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "history_types_value_key" ON "history_types"("value");

-- CreateIndex
CREATE UNIQUE INDEX "history_types_description_key" ON "history_types"("description");

-- CreateIndex
CREATE UNIQUE INDEX "occupations_value_key" ON "occupations"("value");

-- CreateIndex
CREATE UNIQUE INDEX "occupations_description_key" ON "occupations"("description");

-- CreateIndex
CREATE UNIQUE INDEX "plants_value_key" ON "plants"("value");

-- CreateIndex
CREATE UNIQUE INDEX "products_code1C_key" ON "products"("code1C");

-- CreateIndex
CREATE UNIQUE INDEX "record_counters_task_uid_key" ON "record_counters"("task_uid");

-- CreateIndex
CREATE INDEX "idx_record_regulations_marking_sample_id" ON "record_regulations"("marking_sample_id");

-- CreateIndex
CREATE INDEX "idx_record_regulations_record_id" ON "record_regulations"("record_id");

-- CreateIndex
CREATE INDEX "idx_records_apparatusid" ON "records"("apparatusId");

-- CreateIndex
CREATE INDEX "idx_records_boilid" ON "records"("boilId");

-- CreateIndex
CREATE INDEX "idx_records_canid" ON "records"("canId");

-- CreateIndex
CREATE INDEX "idx_records_conveyorid" ON "records"("conveyorId");

-- CreateIndex
CREATE INDEX "idx_records_doc_id" ON "records"("doc_id");

-- CreateIndex
CREATE INDEX "idx_records_docid_cover" ON "records"("doc_id", "id", "productId", "boilId", "conveyorId", "apparatusId", "canId", "workshopId", "plan", "bbf", "dm", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "idx_records_docid_id" ON "records"("doc_id", "id");

-- CreateIndex
CREATE INDEX "idx_records_organic_base_id" ON "records"("organic_base_id");

-- CreateIndex
CREATE INDEX "idx_records_productid" ON "records"("productId");

-- CreateIndex
CREATE INDEX "idx_records_water_base_id" ON "records"("water_base_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_value_key" ON "roles"("value");

-- CreateIndex
CREATE UNIQUE INDEX "roles_description_key" ON "roles"("description");

-- CreateIndex
CREATE INDEX "idx_semi_products_boil_id" ON "semi_products"("boil_id");

-- CreateIndex
CREATE INDEX "idx_semi_products_product_id" ON "semi_products"("product_id");

-- CreateIndex
CREATE INDEX "idx_semi_products_record_id" ON "semi_products"("record_id");

-- CreateIndex
CREATE UNIQUE INDEX "series_value_key" ON "series"("value");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

-- CreateIndex
CREATE INDEX "idx_tokens_user_id" ON "tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tube_conveyor_posts_name_key" ON "tube_conveyor_posts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tube_conveyors_barcode_key" ON "tube_conveyors"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "tube_history_types_value_key" ON "tube_history_types"("value");

-- CreateIndex
CREATE UNIQUE INDEX "tube_history_types_description_key" ON "tube_history_types"("description");

-- CreateIndex
CREATE UNIQUE INDEX "tube_materials_code_1C_key" ON "tube_materials"("code_1C");

-- CreateIndex
CREATE UNIQUE INDEX "tube_products_code_1C_key" ON "tube_products"("code_1C");

-- CreateIndex
CREATE INDEX "idx_user_roles_role_id" ON "user_roles"("roleId");

-- CreateIndex
CREATE INDEX "idx_user_roles_user_id" ON "user_roles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_roleId_userId_key" ON "user_roles"("roleId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_user_id_key" ON "user_settings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workshops_value_key" ON "workshops"("value");

-- AddForeignKey
ALTER TABLE "boils" ADD CONSTRAINT "boils_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "docs" ADD CONSTRAINT "docs_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "occupations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_boil_id_fkey" FOREIGN KEY ("boil_id") REFERENCES "boils"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_historyTypeId_fkey" FOREIGN KEY ("historyTypeId") REFERENCES "history_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_counters" ADD CONSTRAINT "record_counters_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_regulations" ADD CONSTRAINT "record_regulations_marking_sample_id_fkey" FOREIGN KEY ("marking_sample_id") REFERENCES "marking_sample"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_regulations" ADD CONSTRAINT "record_regulations_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_conveyorId_fkey" FOREIGN KEY ("conveyorId") REFERENCES "conveyors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_doc_id_fkey" FOREIGN KEY ("doc_id") REFERENCES "docs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "workshops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regulations" ADD CONSTRAINT "regulations_marking_sample_id_fkey" FOREIGN KEY ("marking_sample_id") REFERENCES "marking_sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regulations" ADD CONSTRAINT "regulations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semi_products" ADD CONSTRAINT "semi_products_boil_id_fkey" FOREIGN KEY ("boil_id") REFERENCES "boils"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semi_products" ADD CONSTRAINT "semi_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semi_products" ADD CONSTRAINT "semi_products_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_assembly" ADD CONSTRAINT "tube_assembly_tube_conveyor_post_id_fkey" FOREIGN KEY ("tube_conveyor_post_id") REFERENCES "tube_conveyor_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_assembly" ADD CONSTRAINT "tube_assembly_tube_material_id_fkey" FOREIGN KEY ("tube_material_id") REFERENCES "tube_materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_assembly" ADD CONSTRAINT "tube_assembly_tube_record_id_fkey" FOREIGN KEY ("tube_record_id") REFERENCES "tube_records"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_histories" ADD CONSTRAINT "tube_histories_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_histories" ADD CONSTRAINT "tube_histories_tube_history_note_id_fkey" FOREIGN KEY ("tube_history_note_id") REFERENCES "tube_histories_notes"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_histories" ADD CONSTRAINT "tube_histories_tube_history_type_id_fkey" FOREIGN KEY ("tube_history_type_id") REFERENCES "tube_history_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_histories" ADD CONSTRAINT "tube_histories_tube_record_id_fkey" FOREIGN KEY ("tube_record_id") REFERENCES "tube_records"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_parameters" ADD CONSTRAINT "tube_parameters_tube_record_id_fkey" FOREIGN KEY ("tube_record_id") REFERENCES "tube_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_records" ADD CONSTRAINT "tube_records_boil_id_fkey" FOREIGN KEY ("boil_id") REFERENCES "boils"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_records" ADD CONSTRAINT "tube_records_tube_conveyor_id_fkey" FOREIGN KEY ("tube_conveyor_id") REFERENCES "tube_conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_records" ADD CONSTRAINT "tube_records_tube_product_id_fkey" FOREIGN KEY ("tube_product_id") REFERENCES "tube_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_sessions" ADD CONSTRAINT "tube_sessions_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "tube_conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_sessions" ADD CONSTRAINT "tube_sessions_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_specifications" ADD CONSTRAINT "tube_specifications_tube_material_id_fkey" FOREIGN KEY ("tube_material_id") REFERENCES "tube_materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tube_specifications" ADD CONSTRAINT "tube_specifications_tube_product_id_fkey" FOREIGN KEY ("tube_product_id") REFERENCES "tube_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

