-- CreateTable
CREATE TABLE "laboratory_assistants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,

    CONSTRAINT "laboratory_assistants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extrusion_quality_control_tresholds_records" (
    "id" SERIAL NOT NULL,
    "tube_cilindrical_section_length_min" INTEGER NOT NULL,
    "tube_cilindrical_section_length_max" INTEGER NOT NULL,
    "membrane_thickness_min" DECIMAL(65,30) NOT NULL,
    "membrane_thickness_max" DECIMAL(65,30) NOT NULL,
    "tube_diameter_min" DECIMAL(65,30) NOT NULL,
    "tube_diameter_max" DECIMAL(65,30) NOT NULL,
    "tube_cilindrical_section_thickness_min" DECIMAL(65,30) NOT NULL,
    "tube_cilindrical_section_thickness_max" DECIMAL(65,30) NOT NULL,
    "tube_rigidity_min" INTEGER NOT NULL,
    "tube_rigidity_max" INTEGER NOT NULL,
    "external_thread_value" TEXT NOT NULL,

    CONSTRAINT "extrusion_quality_control_tresholds_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extrusion_quality_control_params_records" (
    "id" SERIAL NOT NULL,
    "tube_cilindrical_section_length" INTEGER NOT NULL,
    "membrane_thickness" DECIMAL(65,30) NOT NULL,
    "tube_diameter" DECIMAL(65,30) NOT NULL,
    "tube_cilindrical_section_thickness" DECIMAL(65,30) NOT NULL,
    "tube_rigidity" INTEGER NOT NULL,
    "tube_cutting_quality" BOOLEAN NOT NULL DEFAULT false,
    "tightness" BOOLEAN NOT NULL DEFAULT false,
    "external_thread_quality" BOOLEAN NOT NULL DEFAULT false,
    "laboratory_assistant_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "extrusion_quality_control_params_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "laboratory_assistants_barcode_key" ON "laboratory_assistants"("barcode");

-- AddForeignKey
ALTER TABLE "extrusion_quality_control_params_records" ADD CONSTRAINT "extrusion_quality_control_params_records_laboratory_assist_fkey" FOREIGN KEY ("laboratory_assistant_id") REFERENCES "laboratory_assistants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
