-- CreateTable
CREATE TABLE "raw_materials" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "post_number" INTEGER NOT NULL,

    CONSTRAINT "raw_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summary_raw_materials" (
    "id" SERIAL NOT NULL,
    "summary_id" INTEGER NOT NULL,
    "raw_material_id" INTEGER NOT NULL,

    CONSTRAINT "summary_raw_materials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "raw_materials_code_key" ON "raw_materials"("code");

-- AddForeignKey
ALTER TABLE "summary_raw_materials" ADD CONSTRAINT "summary_raw_materials_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summary_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summary_raw_materials" ADD CONSTRAINT "summary_raw_materials_raw_material_id_fkey" FOREIGN KEY ("raw_material_id") REFERENCES "raw_materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;
