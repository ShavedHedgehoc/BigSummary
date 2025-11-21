-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "barcode" VARCHAR(13) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "marking" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "rondels" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "rondels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lots" (
    "id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "lots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summaries" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "conveyor_id" INTEGER NOT NULL,
    "plan" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "post_number" INTEGER NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specifications" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,

    CONSTRAINT "specifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consumed_materials" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consumed_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extrusion_params" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "counter_value" INTEGER NOT NULL,
    "press_speed" INTEGER NOT NULL,
    "blow_time" INTEGER NOT NULL,
    "turning_machine_speed" INTEGER NOT NULL,
    "annealing_furnace_temp" INTEGER NOT NULL,
    "rondel_id" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "extrusion_tresholds" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "press_speed_min" INTEGER NOT NULL,
    "press_speed_max" INTEGER NOT NULL,
    "blow_time_min" INTEGER NOT NULL,
    "blow_time_max" INTEGER NOT NULL,
    "turning_machine_speed_min" INTEGER NOT NULL,
    "turning_machine_speed_max" INTEGER NOT NULL,
    "annealing_furnace_temp_min" INTEGER NOT NULL,
    "annealing_furnace_temp_max" INTEGER NOT NULL,
    "rondel_id" INTEGER NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "employees_barcode_key" ON "employees"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");

-- CreateIndex
CREATE UNIQUE INDEX "conveyors_name_key" ON "conveyors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "batches_name_key" ON "batches"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lots_value_material_id_key" ON "lots"("value", "material_id");

-- CreateIndex
CREATE UNIQUE INDEX "materials_code_key" ON "materials"("code");

-- AddForeignKey
ALTER TABLE "lots" ADD CONSTRAINT "lots_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summaries" ADD CONSTRAINT "summaries_conveyor_id_fkey" FOREIGN KEY ("conveyor_id") REFERENCES "conveyors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_params" ADD CONSTRAINT "extrusion_params_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_params" ADD CONSTRAINT "extrusion_params_rondel_id_fkey" FOREIGN KEY ("rondel_id") REFERENCES "rondels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_params" ADD CONSTRAINT "extrusion_params_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_tresholds" ADD CONSTRAINT "extrusion_tresholds_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrusion_tresholds" ADD CONSTRAINT "extrusion_tresholds_rondel_id_fkey" FOREIGN KEY ("rondel_id") REFERENCES "rondels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
